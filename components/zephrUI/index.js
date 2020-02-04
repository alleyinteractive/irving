// import React from 'react';
// import withData from 'components/hoc/withData';
// import sanitizeHtml from 'sanitize-html';
// import get from 'lodash/get';

// /**
//  * This component queries the JSON file with the transform components.
//  * Look through response and look for all transformed components.
//  * Add them to the redux state.
//  */
// const ZephrUI = withData(
//   `${process.env.ZEPHR_ROOT_URL}/wp-json/mittr/v1/zephrComponents`,
//   {
//     loading: () => (null),
//   }
// )(
//   ({ data }) => {
//     const componentMarkup = get(
//       data,
//       'overlayFooter.zephrOutput.data',
//       false
//     );

//     return (
//       <>
//         {componentMarkup && (
//           <div className={styles.wrapper}>
//             <div
//               dangerouslySetInnerHTML={// eslint-disable-line react/no-danger
//                 { __html: sanitizeHtml(componentMarkup) }
//               }
//             />
//           </div>
//         )
//         }
//       </>
//     );
//   }
// );

// // const mapDispatchToProps = () => ({
// //   dispatchRequestUIComponents: () => disaptch(actionRequestUIComponents()),
// //   dispatchReceiveUIComponents: () => disaptch(actionReceiveUIComponents()),
// // })

// // const withRedux = connect(
// //   undefined,
// //   mapDispatchToProps
// // );

// // export default withRedux(ZephrUI);
// export default ZephrUI;
