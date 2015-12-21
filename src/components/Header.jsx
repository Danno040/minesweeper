import React from 'react';

export default class Header extends React.Component {
  render() {
    const { bombCount, handleReset } = this.props;
    return (
      <header>
        <span className={'digit-counter bomb-count'}>{bombCount}</span>
        <button onClick={handleReset}>{'Reset'}</button>
        <span className={'digit-counter timer'}>{'0'}</span>
      </header>
    );
  }
}

Header.propTypes = {
  bombCount: React.PropTypes.number.isRequired,
  handleReset: React.PropTypes.func.isRequired
};
