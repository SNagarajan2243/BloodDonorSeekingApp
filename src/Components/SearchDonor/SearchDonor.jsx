import React,{Fragment} from 'react'

// import { Link } from 'react-router-dom'

// import styles from './SearchDonor.module.css'

import SearchDonorNavbar from './SearchDonorNavbar/SearchDonorNavbar'

import SearchDonorContainer from './SearchDonorContainer/SearchDonorContainer'

import Footer from '../Footer/Footer'

const SearchDonor = () => {
    return (
        <Fragment>
            <SearchDonorNavbar />
            <SearchDonorContainer />
            <Footer />
        </Fragment>
    )
}

export default SearchDonor