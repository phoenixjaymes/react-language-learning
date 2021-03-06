import React, { useCallback, useState } from 'react';

import ConfirmDialog from './ConfirmDialog';
import FormWrapResponse from './FormWrapResponse';

const withFormWrap = (WrappedComponent) => function WithFormWrap({ ...props }) {
  const { modifyType, categoryName, updateId } = props;
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [stateFormData, setStateFormData] = useState();
  const [apiModifyType, setApiModifyType] = useState('');
  const [fetchUrl, setFetchUrl] = useState('');
  const [updateData, setUpdateData] = useState({});
  const [actionSuccess, setActionSuccess] = useState(false);
  const dialogMessages = {
    add: 'Are you sure you want to ADD this item?',
    update: 'Are you sure you want to UPDATE this item?',
    delete: 'Are you sure you want to DELETE this item?',
  };
  const [actionResponse, setActionReponse] = useState({
    status: '',
    message: '',
  });

  const makeActionResponse = (responseData) => {
    if (responseData.status === 'success') {
      setActionReponse({
        status: responseData.status,
        message: responseData.data.message,
      });
      setActionSuccess(true);
    } else if (responseData.status === 'fail') {
      setActionReponse({
        status: responseData.status,
        message: responseData.data.name,
      });
    } else {
      setActionReponse({
        status: responseData.status,
        message: responseData.message,
      });
    }
  };

  const memoizedFetchUpdatedData = useCallback((urlToFetch) => {
    fetch(urlToFetch)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          setUpdateData(responseData.data[0]);
        } else if (responseData.status === 'fail') {
          setActionReponse({
            status: 'fail',
            message: Object.values(responseData.data).join(', '),
          });
        } else {
          setActionReponse({
            status: 'error',
            message: `${responseData.status}: ${responseData.data.message}`,
          });
        }
      })
      .catch((error) => {
        makeActionResponse({
          status: 'error',
          message: `Error fetching and parsing data, ${error}`,
        });
      });
  }, []);

  const makeFormData = (formState, initialFormState) => {
    const tempFormObj = {};
    const formData = new FormData();

    Object.keys(initialFormState).forEach((prop) => {
      tempFormObj[prop] = formState[prop];
    });

    Object.entries(tempFormObj).forEach((item) => {
      const [prop, value] = item;
      formData.append(prop, value.trim());
    });

    setStateFormData(formData);
  };

  // Submit Add/Post form
  const submitAddForm = () => {
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: stateFormData,
    })
      .then((reponse) => reponse.json())
      .then((responseData) => {
        makeActionResponse(responseData);
      })
      .catch((error) => {
        makeActionResponse({
          status: 'error',
          message: `Error fetching and parsing data, ${error}`,
        });
      });
  };

  // Submit Update/Put form
  const submitUpdateForm = () => {
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: stateFormData,
    })
      .then((reponse) => reponse.json())
      .then((responseData) => {
        makeActionResponse(responseData);
      })
      .catch((error) => {
        makeActionResponse({
          status: 'error',
          message: `Error fetching and parsing data, ${error}`,
        });
      });
  };

  // Submit Delete form
  const submitDeleteForm = () => {
    fetch(fetchUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: stateFormData,
    })
      .then((reponse) => reponse.json())
      .then((responseData) => {
        makeActionResponse(responseData);
      })
      .catch((error) => {
        makeActionResponse({
          status: 'error',
          message: `Error fetching and parsing data, ${error}`,
        });
      });
  };

  // Choose which type of form is being submitted
  const submitForm = () => {
    if (apiModifyType === 'add') {
      submitAddForm();
    } else if (apiModifyType === 'update') {
      submitUpdateForm();
    } else if (apiModifyType === 'delete') {
      submitDeleteForm();
    }
  };

  const handleYesClick = () => {
    setIsDialogShown(false);
    submitForm();
  };

  const handleCancelClick = () => {
    setIsDialogShown(false);
  };

  const handleSubmit = (modifyTypeToUse, apiFetchUrl, formState, initialFormState) => {
    makeFormData(formState, initialFormState);
    setApiModifyType(modifyTypeToUse);
    setFetchUrl(apiFetchUrl);
    setIsDialogShown(true);
    setActionSuccess(false);
  };

  return (
    <div>
      <WrappedComponent
        handleSubmit={handleSubmit}
        modifyType={modifyType}
        categoryName={categoryName}
        updateId={updateId}
        fetchUpdatedData={memoizedFetchUpdatedData}
        updateData={updateData}
        actionSuccess={actionSuccess}
      />
      {isDialogShown === true && (
        <ConfirmDialog
          dialogMessage={dialogMessages[modifyType]}
          handleYesClick={handleYesClick}
          handleCancelClick={handleCancelClick}
        />
      )}
      <FormWrapResponse
        actionResponse={actionResponse}
        setActionReponse={setActionReponse}
      />
    </div>
  );
};

export { withFormWrap as default };
