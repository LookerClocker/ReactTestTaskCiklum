import React, {Component} from 'react';
import SearchAlbums from './SearchAlbums'
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div className="App container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center">
                        {<SearchAlbums/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
