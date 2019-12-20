import React, { Component } from 'react';

const withFlipAndToggle = WrappedComponent => (
  class WithFlipAndToggle extends Component {
    state = {
      flipClass: '',
      exampleClass: '',
    }

    flipCard = () => {
      const { flipClass } = this.state;
      if (flipClass === 'js-flip-card') {
        this.setState({ flipClass: '' });
      } else {
        this.setState({ flipClass: 'js-flip-card' });
      }
    }

    setFlipClass = () => {
      this.setState({ flipClass: '' });
    }

    toggleExamples = () => {
      const { exampleClass } = this.state;
      if (exampleClass === '') {
        this.setState({ exampleClass: 'showExamples', exampleClassText: 'Conjugation' });
      } else {
        this.setState({ exampleClass: '', exampleClassText: 'Examples' });
      }
    }

    render() {
      const { flipClass, exampleClass } = this.state;
      const { ...passThroughProps } = this.props;

      return (
        <WrappedComponent
          flipClass={flipClass}
          exampleClass={exampleClass}
          flipCard={this.flipCard}
          setFlipClass={this.setFlipClass}
          toggleExamples={this.toggleExamples}
          {...passThroughProps}
        />
      );
    }
  }
);

export { withFlipAndToggle as default };
