import React, {Component} from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from '../nba-client';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const AAA = AutoComplete.Option;
// const {Option} = AutoComplete;

class SearchBar extends Component {
   state = {
       dataSource: [],
   }

   handleSearch = (value) => {
       this.setState({
           dataSource: !value ?
               [] : nba.searchPlayers(value).map(player => ({
                   fullName: player.fullName,
                   playerId: player.playerId,
               }))
       });
   }

   onSelect = (name) => {
       this.props.handleSelectPlayer(name);
   }

   render() {
       const { dataSource } = this.state;
       const aaa = dataSource.map((player) => (
           <AAA key={player.playerId} value={player.fullName} className="player-option">
               <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`} alt={player.fullName}/>
               <span className="player-option-label">{player.fullName}</span>
           </AAA>
       ));
       return (
           <AutoComplete
               className="search-bar"
               dataSource={aaa}
               onSelect={this.onSelect}
               onSearch={this.handleSearch}
               placeholder="Search NBA Player"
               size="large"
               optionLabelProp="value"
           >

               <Input suffix={<Icon type="search" className="certain-category-icon" />} />
           </AutoComplete>
       );
   }
}

export default SearchBar;