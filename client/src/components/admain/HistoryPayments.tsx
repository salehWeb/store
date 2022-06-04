import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getHistoryPayments } from '../../server'
import { Loader } from '../tools'

const HistoryPayments = () => {
  const [page, setPage] = useState(0)
  const [allTotal, setAllToatal] = useState(null)
  const [historyPayments, setHistoryPayments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAllPayments = async () => {
      setIsLoading(true)
      await getHistoryPayments(page, allTotal).then(res => {
        console.log(res)
        setHistoryPayments(res.data.data)
        setAllToatal(res.data.total)
        setIsLoading(false)
      }).catch(err => console.log(err))
      setIsLoading(false)
    }
    getAllPayments()
  }, [page])

  const hanelNextPage = () => {
    setPage(page + 1)
  }
  const hanelPrevPage = () => {
    setPage(page - 1)
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        historyPayments.length > 0 ? (
          <div className="flex justify-between items-center">

            {historyPayments.map((item: any) => (
              <div key={item._id} className="flex flex-col items-center">
                {moment(item.sendAt).format('DD/MM/YYYY')}
                </div>
            ))}
            </div>
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