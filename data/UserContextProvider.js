import { render } from "react-dom";
import UserContext from "./data/UserContext";

class UserContextProvider extends Component {
  state = {
    users: {
      lex: { firstName: "Lex", lastName: "Fridman" },
      joe: { firstName: "Joe", lastName: "Jonas" },
      adin: { firstName: "Adin", lastName: "Ross" },
      luka: { firstName: "Luka", lastName: "Doncic" },
      travis: { firstName: "Travis", lastName: "Scott" },
    },
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          users: this.state.users,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
