import React, { Component } from 'react';

// import ConfirmDialog from './ConfirmDialog';

const withUtilities = WrappedComponent => (
  class WithUtilities extends Component {
    state = {
      isDialogShown: true,
      umlautStyles: {},
      umlautItem: '',
    }

    // handleYesClick = () => {
    //   this.setState({
    //     isDialogShown: false,
    //   });

    //   this.submitForm();
    // }

    // handleCancelClick = () => {
    //   this.setState({
    //     isDialogShown: false,
    //   });
    // }

    handleFocus = (e, umlauts) => {
      // const { umlauts } = this.state;
      const umlautItem = e.target.getAttribute('id');

      console.log(umlauts, umlautItem);

      if (e.target.type === 'text' && umlauts.includes(umlautItem)) {
        const yPos = e.target.offsetTop + e.target.offsetHeight;
        this.setState({
          umlautStyles: {
            right: `${e.target.offsetLeft}px`,
            top: `${yPos}px`,
            visibility: 'visible',
          },
          umlautItem,
        });
      }
    }

    handleBlur = () => {
      this.setState({
        umlautStyles: {
          right: '0',
          top: '0',
          visibility: 'hidden',
        },
      });
    }

    render() {
      // const { isDialogShown } = this.state;
      const { umlautStyles, umlautItem } = this.state;
      const { ...passThroughProps } = this.props;

      return (
        <div>
          <WrappedComponent
            handleFocus={this.handleFocus}
            // handleBlur={this.handleBlur}
            umlautStyles={umlautStyles}
            umlautItem={umlautItem}
            {...passThroughProps}
          />

          {/* {isDialogShown === true && (
            <ConfirmDialog
              // dialogMessage={dialogMessage}
              handleYesClick={this.handleYesClick}
              handleCancelClick={this.handleCancelClick}
            />
          )} */}
        </div>
      );
    }
  }
);

export { withUtilities as default };
