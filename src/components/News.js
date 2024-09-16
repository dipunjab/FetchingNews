import React, {useEffect, useState } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner'
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)


  const updateNews =  async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
    setloading(true)
    let data = await fetch(url)
     
    let parsedData = await data.json()
    // console.log(parsedData);
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)

    props.setProgress(100)

  }

  useEffect(()=>{
    updateNews()
  },[]) //it rund after render

  const fetchMoreData = async () => {
    setpage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };


    return (
      <>
        <h1 className='text-center my-4'>NewsDO - Top Headlines</h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">


            <div className='row'>
              {articles.map((elem) => {
                return (
                  <div className="col-md-4" key={elem.url}>
                    <Newsitems title={elem.title ? elem.title : ""} description={elem.description ? elem.description : ""} newsUrl={elem.url} imageUrl={elem.urlToImage} author={elem.author} date={elem.publishedAt} source={elem.source.name} category={props.category} />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}


export default News