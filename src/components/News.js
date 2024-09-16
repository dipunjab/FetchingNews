import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner'
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
  }

  async updateNews(pageno) {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
     
    let parsedData = await data.json()
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)

  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}ce40b32b5ff4584bc1af7c9e5bd93dc&page=1&pageSize=${this.props.pageSize}`
    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // // console.log(parsedData);
    // this.setState({ 
    //   articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults , 
    //   loading: false})
    this.updateNews()
  } //it rund after render

  // handlePrevClick = async () => {
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}ce40b32b5ff4584bc1af7c9e5bd93dc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
  // this.setState({loading: true})
  // let data = await fetch(url)
  // let parsedData = await data.json()

  // this.setState({
  //   page: this.state.page - 1,
  //   articles: parsedData.articles,
  //   loading: false
  // })
  //   this.setState({
  //     page: this.state.page -1
  //   })
  //   this.updateNews()
  // }

  // handleNextClick = async () => {
  // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}ce40b32b5ff4584bc1af7c9e5bd93dc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
  //   this.setState({loading: true})
  //   let data = await fetch(url)
  //   let parsedData = await data.json()

  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  // }
  //   this.setState({
  //     page: this.state.page + 1
  //   }) 
  //   this.updateNews()
  // }

  fetchMoreData = async () => {

    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  render() {
    return (
      <>
        <h1 className='text-center my-4'>NewsDO - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        {/* <div className='row'> */}
        {/* {!this.state.loading && this.state.articles.map((elem) => {
            return (
              <div className="col-md-4" key={elem.url}>
                <Newsitems title={elem.title ? elem.title : ""} description={elem.description ? elem.description : ""} newsUrl={elem.url} imageUrl={elem.urlToImage}  author={elem.author} date={elem.publishedAt} source={elem.source.name} category={this.props.category}/>
              </div>
            )
          })} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">


            <div className='row'>
              {this.state.articles.map((elem) => {
                return (
                  <div className="col-md-4" key={elem.url}>
                    <Newsitems title={elem.title ? elem.title : ""} description={elem.description ? elem.description : ""} newsUrl={elem.url} imageUrl={elem.urlToImage} author={elem.author} date={elem.publishedAt} source={elem.source.name} category={this.props.category} />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
