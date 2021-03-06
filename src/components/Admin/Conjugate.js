import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FormButton from './FormComponents/FormButton';

import styles from './conjugate.module.css';

const Conjugate = ({
  infinitive, lang, tense, handleConjugateClick,
}) => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  let progressState;
  let progressText = '';

  const handleClick = () => {
    // handleConjugateClick({
    //   ich: 'aß',
    //   du: 'aßest',
    //   er: 'aß',
    //   wir: 'aßen',
    //   ihr: 'aßt',
    //   sie: 'aßen',
    // });

    // handleConjugateClick({
    //   perfect: 'gegessen',
    //   auxiliary: 'haben',
    // });

    if (infinitive === undefined) {
      return;
    }

    setLoading(true);

    const fetchUrl = 'https://phoenixjaymes.com/php/verb-scraping/get-verb.php';

    const formData = new FormData();
    formData.append('infinitive', infinitive);

    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: formData,
    })
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          setLoading(false);
          handleConjugateClick(responseData.data[tense]);
        } else if (responseData.status === 'fail') {
          setLoading(false);
          setFetchError(true);
        } else {
          setLoading(false);
          setFetchError(true);
        }
      })
      .catch(() => {
        setLoading(false);
        setFetchError(true);
      });
  };

  if (loading === true) {
    progressState = styles.loading;
    progressText = 'Loading ...';
  } else if (fetchError === true) {
    progressState = styles.error;
    progressText = 'Unable to conjugate!';
  } else {
    progressState = '';
    progressText = '';
  }

  return (
    <div className={styles.wrap}>
      <div>
        <FormButton
          type="button"
          label="Conjugate"
          handleClick={handleClick}
        />
      </div>
      <div>
        <span className={`${styles.progress} ${progressState}`}>{progressText}</span>
      </div>
    </div>
  );
};

Conjugate.propTypes = {
  infinitive: PropTypes.string,
  lang: PropTypes.string,
  tense: PropTypes.string,
  handleConjugateClick: PropTypes.func,
};

export default Conjugate;