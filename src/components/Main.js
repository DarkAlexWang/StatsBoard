import React, {Component} from 'react';

import nba from '../nba-client';
import Profile from './Profile';
import DataViewContainer from './DataViewContainer';
import SearchBar from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';

class Main extends Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO
    }
 
    componentDidMount() {
        console.log(7);
        window.nba = nba;
        this.loadPlayerInfo(DEFAULT_PLAYER_INFO.fullName);
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId}).then((info) => {
            console.log(info);
            const playInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playInfo);
            this.setState({ playerInfo: playInfo });
        })
    } 

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    }
    
    render() {
        console.log(2);
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer} />
                <div className="player">
                    <Profile one={this.state.playerInfo} />
                    <DataViewContainer playerId={this.state.playerInfo.playerId} />
                </div>
            </div>
        );
    }


}

export default Main;