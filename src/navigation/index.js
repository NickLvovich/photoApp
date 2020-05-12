import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ViewNotes from '../screens/ViewNotes'
import AddNotes from '../screens/AddNotes'
import UpdateScreen from '../screens/UpdateScreen'

const StackNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes
    },
    AddNotes: {
      screen: AddNotes
    },
    UpdateScreen: {
      screen: UpdateScreen
    }
  },
  {
    initialRouteName: 'ViewNotes',
    headerMode: 'none',
    mode: 'modal'
  }
)

export default createAppContainer(StackNavigator)
