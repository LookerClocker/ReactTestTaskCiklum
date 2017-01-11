import React, {Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import fetchJsonp from 'fetch-jsonp';

export default class SearchAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albumsInfo: [],
            searchQuery: '',
            albumsItunes: [],
            albumsSpotify: [],
        };
    };

    /**
     * Handling typing value
     * @param e = event
     */
    handleChange = (e)=> {
        this.setState({
            searchQuery: e.target.value
        })
    };

    /**
     * Handling key press 'Enter'
     * @param e = event
     */
    handleKeyPress = (e)=> {
        if (e.key === "Enter") {
            this.fetchAlbums(this.state.searchQuery);
        }
    };

    /**
     * Fetching artist`s information from Spotify and iTunes API`s using fetch and fetchJsonp
     * @param query = value wich user typed
     */
    fetchAlbums = (query)=> {
        /**
         * Fetching artist`s information from Spotify API and added all necessary information into albumsSpotify array
         * @param query = value wich user typed
         */
        const fetchSpotify = fetch('https://api.spotify.com/v1/search?q=' + query + '&type=album')
            .then(r => r.json())
            .then(r => {
                this.setState({
                    albumsSpotify: r.albums.items.map(item=> {
                        return {
                            image: item.images[0].url,
                            albumName: item.name,
                            albumLink: item.external_urls.spotify
                        };
                    })
                });
            })
            .catch(ex => console.log('fetching failed', ex));

        /**
         * Fetching artist`s information from iTunes API and added all necessary information into albumsItunes array
         * in this case i used fetchJsonp because of itunes domain doesn`t support cors
         * @param query = value wich user typed
         */
        const fetchItunes = fetchJsonp('https://itunes.apple.com/search?term=' + query + '&entity=album')
            .then(r => r.json())
            .then(r => {
                this.setState({
                    albumsItunes: r.results.map(item=> {
                        return {
                            image: item.artworkUrl100,
                            albumName: item.collectionName,
                            albumLink: item.collectionViewUrl

                        };
                    })
                });
            })
            .catch(ex => console.log('fetching failed', ex));

        /**
         * This method allows to gather all information from different API`s and will be executed only when all requests
         * will be executed. Concat data from both API into state (albumsInfo array). It doesn`t modify data which are in state.
         * @param fetchItunes = all data from itunes
         * @param fetchSpotify = all data from spotify
         * @param albumsInfo = new array witch contains values from both array.
         */
        Promise.all([fetchItunes, fetchSpotify]).then(() => {
            this.setState({
                albumsInfo: this.state.albumsSpotify.concat(this.state.albumsItunes)
            });
        });
    };


    render() {
        let renderedAlbums = this.state.albumsInfo.map((item, index) => {
            return (
                <div className={'col-sm-4 album '} key={index}>
                    <a href={item.albumLink} target="_blank"> <img src={item.image} alt=""/>
                        <div className="text-center">
                            <h6>{item.albumName}</h6>
                        </div>
                    </a>
                </div>
            );
        });

        return (
            <div className="app-wrapper text-center">
                <h1>Spotify and iTunes artist search</h1>
                <div className="input-wrap">
                    <div className="group">
                        <input type="text" required onChange={this.handleChange} value={this.state.searchQuery}
                               onKeyPress={this.handleKeyPress}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Just type an artist name to search.</label>
                    </div>
                </div>

                <div>
                    {renderedAlbums}
                </div>
            </div>
        );
    }

}