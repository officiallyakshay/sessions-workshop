import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'

class User extends React.Component {
  render() {
    const { userId } = this.props
    return (
      <div 
      style = {{ 
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
      }}>
        <div
        style = {{ 
          width: '100px',
          height: '100px',
          textAlign: 'center',
        }}>
          { `Your userId is: ${userId}`}
        </div>
      </div>
    )
  }
}

// User.propTypes = {
//   userId: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]).isRequired,
//   logout: PropTypes.func.isRequired,
// };

const mapStateToProps = state => ({
  userId: state.user ? state.user.id : ''
});

const mapDispatchToProps = dispatch => ({
  logout: () => console.log('logout!')
})

const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)
export default ConnectedUser