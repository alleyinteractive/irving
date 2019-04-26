import React, { useState, useEffect } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { CSSTransition } from 'react-transition-group';
import styles from './content.css';
import transitionStyles from './transition.css';

/* eslint-disable */
const Content = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  console.log(loaded);

  return (
    <CSSTransition
      appear
      mountOnEnter
      classNames={transitionStyles}
      timeout={300}
      in={loaded}
    >
      <div className={styles.wrapper}>
        <p>Enim dapibus aenean sodales sit adipiscing pretium in parturient nascetur platea tellus, dolor dis ac ridiculus faucibus ornare sociosqu urna suspendisse nostra, imperdiet etiam mollis posuere quis vestibulum praesent ultrices pharetra est. Placerat consequat varius ullamcorper erat etiam curabitur consectetur dolor, nostra eu amet ornare dictum cras augue auctor, potenti ridiculus gravida pretium hendrerit dui interdum. Ornare pharetra ullamcorper mollis ante erat hendrerit pellentesque platea nisl auctor, congue nullam lacus fusce odio netus viverra neque et, consectetur sed sem quis cubilia ultricies a rhoncus tellus. Fusce ut morbi nullam nisl blandit arcu conubia sem placerat auctor, dictum eros facilisis nunc tempus sagittis diam iaculis fringilla vestibulum taciti, justo ad vulputate sociis rutrum mauris dictumst faucibus porta. Dapibus porta per lacus habitant leo pulvinar lectus blandit elementum ornare id, euismod aliquam convallis nulla vehicula neque diam donec mauris nullam, malesuada vel praesent curae himenaeos platea fringilla quisque ad nascetur. Aenean aliquet sagittis diam hac eros convallis consequat cursus, quis dictum mattis nibh senectus euismod est, nisi id quisque fusce habitasse vehicula tincidunt. Malesuada venenatis faucibus auctor pretium diam semper, at hendrerit ligula purus scelerisque. Ut ligula taciti quam sapien tristique elementum arcu molestie aliquet, fringilla massa dignissim quisque eleifend per potenti lacinia sociis, risus morbi eget netus duis est ornare fusce.</p>
        <p>Tellus aliquet massa mollis sed sociis euismod purus habitant suscipit eu, aptent mi pretium congue faucibus natoque porttitor sollicitudin. Condimentum nascetur integer pellentesque mi varius fringilla iaculis tortor hendrerit arcu tristique eros, lacus sit habitant nam urna justo euismod lectus ultricies vulputate. Purus tempor habitant molestie pulvinar porta aliquet tincidunt a pellentesque est maecenas vel cubilia, magnis in dictum semper platea felis etiam malesuada commodo ut iaculis. Nam ligula curae ullamcorper nascetur auctor blandit faucibus leo vehicula facilisi, lacus scelerisque aliquet suspendisse eu ipsum venenatis proin nulla, duis molestie donec integer sit tellus pharetra nisl quisque. Faucibus litora adipiscing cubilia bibendum vulputate erat elementum, aptent etiam turpis urna vestibulum commodo nibh, natoque aliquam sed potenti tellus ante. Imperdiet interdum mattis vivamus sem nec consectetur, dis purus nam erat adipiscing dapibus, habitasse sollicitudin per himenaeos egestas. Id fames netus vivamus orci lobortis facilisis lacinia sem magnis semper, nibh nec odio condimentum placerat etiam sollicitudin aliquam donec. Suspendisse eleifend elit porttitor tellus mauris sapien consequat mi commodo sociosqu duis, orci vitae penatibus quisque sem tincidunt adipiscing gravida nisi nunc. Condimentum hac praesent class ridiculus lorem risus facilisis conubia blandit tempor laoreet tortor penatibus, mi aliquet consequat dignissim phasellus nulla libero augue in fermentum felis lobortis nam hendrerit, urna taciti commodo adipiscing id sit ad cursus dictum metus porta habitasse.</p>
        <p>Duis dolor erat fringilla primis praesent purus velit, ultricies lorem class sagittis lectus malesuada, fames elit dui ornare per justo. Est libero feugiat justo etiam parturient platea duis, ultrices porta facilisis imperdiet suspendisse consectetur lobortis ad, vehicula tortor commodo fringilla sit malesuada. Diam mi suspendisse taciti imperdiet turpis leo, lobortis aptent non parturient sapien amet montes, odio id ridiculus nascetur commodo. Sollicitudin condimentum etiam convallis arcu cubilia tortor tristique parturient neque, vehicula nascetur suspendisse fames at nibh nam dis habitant, leo dapibus ante quam conubia erat praesent eget. Iaculis nec aenean commodo sollicitudin class ad dignissim porta egestas ultricies platea, primis blandit quam varius quis per curabitur ipsum non. Nam laoreet primis imperdiet elit vel ipsum commodo tempus dolor, duis ridiculus libero consectetur nunc adipiscing maecenas netus est, at mi aptent taciti sit tellus vitae aliquam.</p>
      </div>
    </CSSTransition>
  );
};

export default withStyles(styles)(Content);
