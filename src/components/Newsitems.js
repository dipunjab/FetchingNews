import React, { Component } from 'react'

export class Newsitems extends Component {

  
  render() {
    let {title, description, imageUrl, newsUrl, author , date, source, category} = this.props
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let newDate = new Date(date)
    const localDate = new Intl.DateTimeFormat('en-US', {
      timeZone: userTimeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
  }).format(newDate);

  const chooseColor = (() => {
    switch (category) {
      case 'business': return 'success';
      case 'health': return 'primary';
      case 'sports': return 'success';
      case 'technology': return 'dark';
      case 'science': return 'info';
      default: return 'danger'; 
    }
  })();

 

    return (
      <div className='my-3'>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}<span className={`mx-3 badge text-bg-${chooseColor}`}>{source}</span>
              </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-body-secondary">By {author?author: "Unkown"} on {localDate}</small></p>
              <a rel='noreferrer' href={newsUrl} className="btn btn-dark btn-sn">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitems
