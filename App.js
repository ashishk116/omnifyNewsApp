import React from 'react';
import { FlatList,TouchableOpacity,View,Text,StyleSheet } from 'react-native';

// Import getNews from news.js
import { getNews } from './src/config/news';
import Article from './src/screens/tabs/Article';
import LinearGradient from 'react-native-linear-gradient';
import { Appbar, Badge, IconButton } from 'material-bread';
import DatePicker from 'react-native-date-ranges';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true ,page: 0,posts: [],  date: new Date('2020-06-12T14:42:42'), mode: 'date',show: false,showDatepic:false};//date:"2016-05-15"
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews();//this is the default first will call everytime the app opensup
    
  }

storenews(){
 getNews()
 .then( localStorage.setItem("mynews", JSON.stringify(articles => this.setState({ articles, refreshing: false })))
 )
 .catch(() => this.setState({ refreshing: false }));
 
}

getStoredNews(){
  var storedNews = JSON.parse(localStorage.getItem("mynews"));

  return storedNews;
}


//This function gets the news from the getNews funtion
  fetchNews() {

    //setting the state of articles to show the news
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }


  //handles the refresh of news on the app
  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchNews()
    );
  }

//Funtion to show the Datepicker for range
  showdatepicker(){
    console.log("chekcing this block")
    this.setState(
      {
        showDatepic: 'true'
      }
      )
  }

getTheRange(value){
console.log("chekcing range",value)

}


  render() {

    
    return (
      <View>


         <Appbar
         color={'#1C8D73'}
            barType={"normal"}
            title={'Omnify News'} 
            onNavigation={() => console.log('onNavigation!')}
            actionItems={[ 
             <TouchableOpacity
             onPress={this.showdatepicker.bind(this)}>
              <Text style={{color:'white',fontWeight:'bold'}}>Date Filter</Text>
              </TouchableOpacity>
            ]
            }
        /> 
        
        { this.state.showDatepic && 
          <DatePicker
      style={ { width: 350, height: 45 } }
      customStyles = { {
          placeholderText:{ fontSize:20 }, // placeHolder style
            } } // optional 
            centerAlign // optional text will align center or not
            allowFontScaling = {false} // optional
            placeholder={'Apr 27, 2018 → Jul 10, 2018'}
            mode={'range'}
            onConfirm={value=>this.getTheRange(value)}
        />

        }
       <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
        
      /> 
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});