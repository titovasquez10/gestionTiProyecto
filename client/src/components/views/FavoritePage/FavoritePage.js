import React,{ useEffect, useState } from 'react'
import './favorite.css';
import Axios from 'axios';
import { Popover } from 'antd';
import { IMAGE_URL } from '../../Config'


export default function FavoritePage() {

    const variable = { userFrom: localStorage.getItem('userId') }

    const [FavoritedMovies, setFavoritedMovies] = useState([])

    useEffect(() => {
        fetchFavoritedMovies();
    }, [])

    const fetchFavoritedMovies = () => {
        Axios.post('/api/favorite/getFavoritedMovie', variable)
        .then(response => {
            if(response.data.success){
                setFavoritedMovies(response.data.favorites)
            } else {
                alert('Failed to get favorited vidios')
            }
        })
    }

    const onClickRemove = (movieId) => {

        const variable = {
            movieId: movieId,
            userFrom:localStorage.getItem('userId')
        }

        Axios.post('/api/favorite/removeFromFavorite', variable)
        .then(response => {
            if (response.data.success) {
                fetchFavoritedMovies();
            } else {
                alert('Failed to remove from favorite')
            }
        })
    }

    const readerTableBody = FavoritedMovies.map((movie, index) => {

        const content = (
            <div>
                {movie.moviePost ?
                <img src={`${IMAGE_URL}}w500${movie.moviePost}`} alt="moviePost" />
                :
                "no Image"    
                }
            </div>
        
        )


        return <tr>

            <Popover content={content} title={`${movie.movieTitle}`}>

            <td>{movie.movieTitle}</td>  

            </Popover>
                  
            <td>{movie.movieRunTime} mins</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>
                Remove from the Favorites</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Favorite Movies By Me</h3>
            <hr />

            <table>
                <thead>
                    <tr>
                        <tr>
                          <th>Movie Title</th>
                          <th>Movie RunTime</th>
                          <th>Remove from favorites</th>  
                        </tr>
                    </tr>
                </thead>
                <tbody>
                    
                    {readerTableBody}

                </tbody>                
            </table>          
        </div>
    )
}

