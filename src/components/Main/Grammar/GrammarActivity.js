import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LearningContext } from '../../Context';

import ActivityWrap from '../ActivityComponents/ActivityWrap';
import ActivityHeader from '../ActivityComponents/ActivityHeader';

import styles from './grammarActivity.module.css';

const GrammarActivity = ({ match }) => {
  const { lang } = useContext(LearningContext);
  const { id } = match.params;
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [heading, setHeading] = useState('');
  const [grammarContent, setGrammarContent] = useState({ __html: '' });

  const makeContent = (content) => {
    // const pageContnent = content.map((item) => {
    //   if (item.type === 'h2') {
    //     return <h2 key={item.id} className={styles.h2Heading}>{item.val}</h2>;
    //   }

    //   if (item.type === 'h3') {
    //     return <h3 key={item.id} className={styles.h3Heading}>{item.val}</h3>;
    //   }

    //   if (item.type === 'ul') {
    //     const ulList = item.val.map((li) => <li key={li.id}>{li.val}</li>);
    //     return (
    //       <ul key={item.id} className={styles.ulList}>
    //         {ulList}
    //       </ul>
    //     );
    //   }

    //   if (item.type === 'table') {
    //     const rows = item.val.map((rowItem) => {
    //       const cells = rowItem.map((cellItem) => {
    //         return <td key={cellItem.id}>{cellItem.val}</td>;
    //       });

    //       return <tr key={rowItem.id}>{cells}</tr>;
    //     });

    //     return (
    //       <table key={item.id}>
    //         <tbody>{rows}</tbody>
    //       </table>
    //     );
    //   }

    //   return <p key={item.id} className={styles.normalText}>{item.val}</p>;
    // });

    const pageContnent = '';

    setGrammarContent(pageContnent);
  };

  useEffect(() => {
    fetch(
      `https://phoenixjaymes.com/api/language/grammar/${id}/?lang=${lang}`,
    )
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          const data = responseData.data[0];

          setHeading(data.title);

          // makeContent(JSON.parse(data.content));
          setGrammarContent({ __html: data.content });

          setIsLoading(false);
        } else {
          setIsLoading(false);
          setFetchError(true);
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        setIsLoading(false);
        setFetchError(true);
      });
  }, [id, lang]);

  if (isLoading === true) {
    return (
      <div>Loading</div>
    );
  }

  if (fetchError === true) {
    return (
      <div>
        <p>Sorry, we&apos;re unable to retrieve data</p>
        <div>
          <Link to="/grammar" className="activity_buttons__btn">Back to Grammar</Link>
        </div>
      </div>
    );
  }

  return (
    <ActivityWrap>

      <ActivityHeader
        heading={heading}
        page="grammar"
      />

      <div className={styles.wrap}>
        <div dangerouslySetInnerHTML={grammarContent} />
      </div>

      <div>---</div>
    </ActivityWrap>
  );
};

GrammarActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default GrammarActivity;
