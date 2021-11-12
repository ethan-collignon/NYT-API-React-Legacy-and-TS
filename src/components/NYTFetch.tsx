import React, { Component}  from 'react';
import Display from './Display';

type Articles = {
    result: any, //might need to change back to any
    searchItem: string,
    startDate: string,
    endDate: number | string,
    pageNumber: number
}

export default class NYT extends Component<{}, Articles> {
    constructor(props: any) {
        super(props)
        this.state = {
            result: [],
            searchItem: '',
            startDate: '',
            endDate: '',
            pageNumber: 0
        }
        this.fetchArticles = this.fetchArticles.bind(this)
    }

    fetchArticles = () => {
        let key = 'DtwAIF725wNXPyWbpec3nlXGdS4AWTry'
        let URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchItem}`

        if(this.state.startDate !== ''){
            console.log(this.state.startDate);
            URL += '&begin_date=' + this.state.startDate
        };
        
        if(this.state.endDate !== ''){
            URL += '&end_date=' + this.state.endDate
        }

        console.log(URL);
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            this.setState({
                result: data.response.docs
            });
        })
    }
    handleSubmit(e: any) {
        e.preventDefault()
        this.fetchArticles()
    }

    nextPage = (e: any) => {
        e.preventDefault()
        this.setState({
            pageNumber: this.state.pageNumber + 1
        }, () => {this.fetchArticles()})
        console.log(this.state.pageNumber);
    }

    previousPage = (e: any) => {
        e.preventDefault()
        if(this.state.pageNumber > 0) {
            this.setState({
                pageNumber: this.state.pageNumber - 1
            }, () => {this.fetchArticles()})
        } else {
            return
        }
    }

    render(){
        return(
            <div>
                <div className="inputs">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                    
                    <p>
                            <label >Enter a SINGLE search term (required): </label>
                            <input type="text" id="search"  required onChange={(e) => this.setState({searchItem: e.target.value})}/> 
                        </p>
                        <p>
                            <label>Enter a start date (format YYYYMMDD): </label>
                            <input type="date" id="start-date" pattern="[0-9]{8}" onChange={(e) => this.setState({startDate: e.target.value})} />
                        </p>
                        <p>
                            <label >Enter an end date (format YYYYMMDD) :</label>
                            <input type="date" id="end-date" pattern="[0-9]{8}" onChange={(e) => this.setState({endDate: e.target.value})}/>
                        </p>
                        <p>
                            <button>Submit search</button>
                        </p>
                    </form>
                </div>
                <div className='results'>
                    <button onClick={(e) => this.previousPage(e)}>Previous</button>
                    <button onClick={(e) => this.nextPage(e)}>Next</button>
                    <Display result={this.state.result}/>
                </div>
            </div>
        )
    }
}