import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { getHistoryPayments } from '../../../server'
import Pagntion from '../../pagntion/Pagntion'
import { Loader } from '../../tools'
import HitoryPay from './HitoryPay'

const HistoryPayments = () => {
  const [page, setPage] = useState(1)
  const [allTotal, setAllToatal] = useState<any>(null)
  const [historyPayments, setHistoryPayments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAllPayments = async () => {
      setIsLoading(true)
      await getHistoryPayments(page, allTotal).then(res => {
        setHistoryPayments(res.data.data)
        setAllToatal(res.data.total)
        setIsLoading(false)
      }).catch(err => console.log(err))
      setIsLoading(false)
    }
    getAllPayments()
  }, [page])

  const handelNext = () => {
    setPage(page + 1)
  }
  const handelPrevious = () => {
    setPage(page - 1)
  }
  const handelPageLength = (pageLength: number) => {
    setPage(pageLength)
  }


  let pageLength: any = useMemo(() => { return [] }, [])

  useEffect(() => {
    if (allTotal) {
      for (let i = 0; i <= allTotal / 8; i++) {

        pageLength.push({
          page: i + 1,
          active: page === i + 1 ? true : false
        })

      }
    }
  }, [allTotal, page, pageLength])


  return (
    <div className="min-h-[60vh] my-10">
      {isLoading ? (
        <Loader />
      ) : (
        historyPayments?.length > 0 ? (
          <>
            <div className="min-h-[60vh] w-full flex  justify-center items-center my-10">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-100 uppercase bg-gray-700">
                    <tr>
                      <th scope="col" className="px-5 py-[10px]">
                        Status
                      </th>
                      <th scope="col" className="px-5 py-[10px]">
                        Total
                      </th>
                      <th scope="col" className="px-5 py-[10px]">
                        SendAt
                      </th>
                      <th scope="col" className="px-5 py-[10px]">
                        Items
                      </th>
                      <th scope="col" className="px-5 py-[10px]">
                        User Name
                      </th>
                      <th scope="col" className="px-5 py-[10px]">
                        User Email
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {historyPayments && historyPayments.map((item: any, index: number) => (
                      <HitoryPay item={item} index={index} key={item._id} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex w-full justify-center items-center">
              <Pagntion pageLength={pageLength} handelNext={handelNext} handelPrevious={handelPrevious} handelPageLength={handelPageLength} />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <h1>No result</h1>
          </div>
        )
      )}
    </div>
  )
}

export default HistoryPayments