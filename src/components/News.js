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
  const captialLetter = (letter)=>{
      return letter[0].toUpperCase()+ letter.slice(1)
  }

  useEffect(()=>{
    document.title = `${captialLetter(props.category)}-NewsDo -`
    updateNews()
      // eslint-disable-next-line
  },[]) //it run after render

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
    setpage(page + 1)
    let data = await fetch(url)
    let parsedData = await data.json()
    
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };


    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px'}}>NewsDO - Top Headlines</h1>
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