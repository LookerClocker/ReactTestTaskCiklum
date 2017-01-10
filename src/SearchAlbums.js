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

    handleChange = (e)=> {
        this.setState({
            searchQuery: e.target.value
        })
    };

    handleKeyPress = (e)=> {
        if (e.key === "Enter") {
            this.fetchAlbums(this.state.searchQuery);
        }
    };

    fetchAlbums = (query)=> {
        let fetchSpotify = fetch('https://api.spotify.com/v1/search?q=' + query + '&type=album')
            .then(r => r.json())
            .then(r => {
                console.log(r);
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

        let fetchItunes = fetchJsonp('https://itunes.apple.com/search?term=' + query + '&entity=album')
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
                <h1>Spotify and iTunes album search</h1>
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