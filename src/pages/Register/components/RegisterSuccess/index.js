import React from 'react';
import { Route } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { Flex, Button, WhiteSpace, WingBlank } from 'antd-mobile';

import styles from './register-success.module.scss';


const duration = 800;
const defaultStyle = {
  transition: `transform ${duration}ms cubic-bezier(0.19, 1, 0.22, 1)`,
  transform: 'translate3D(0, 100%, 0)',
  boxShadow: '0 0 0 transparent',
};
const transitionStyles = {
  entering: {
    transform: 'translate3D(0, 0, 0)',
    boxShadow: '0 0 300px rgba(0, 0, 0, .5)',
  },
  entered: {
    transform: 'translate3D(0, 0, 0)',
    boxShadow: '0 0 300px rgba(0, 0, 0, .5)',
  },
  exiting: {
    transform: 'translate3D(0, 100%, 0)',
    boxShadow: '0 0 0 transparent',
  },
  exited: {
    transform: 'translate3D(0, 100%, 0)',
    boxShadow: '0 0 0 transparent',
  },
};
const Icon = (
  <svg
    t="1564486004698"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1359"
    width="128"
    height="128"
  >
    <path d="M517.226025 28.106128c-267.441075 0-484.238726 216.797651-484.238726 484.238726s216.797651 484.238726 484.238726 484.238726c111.052259 0 216.414935-37.508265 301.479309-105.281835 10.209526-8.131191 11.883655-23.000853 3.752464-33.190937-8.131191-10.209526-22.981411-11.883655-33.190937-3.752464-76.772524 61.155848-171.803901 94.971002-272.061302 94.971002-241.352907 0-437.004959-195.653075-437.004959-437.005982S275.852652 75.319429 517.205559 75.319429c241.352907 0 437.005982 195.653075 437.005982 437.004959 0 82.744539-23.02132 162.03849-65.796542 230.740198-6.900154 11.056823-3.53143 25.644053 7.54586 32.524764 11.07729 6.900154 25.644053 3.53143 32.54523-7.54586 47.435359-76.126818 72.958662-164.076916 72.958662-255.719102C1001.464751 244.904803 784.6671 28.106128 517.226025 28.106128z" p-id="1360" fill="#1dd1a1"></path>
    <path d="M788.56078 375.24536 504.998539 667.906839c-8.918114 9.200546-23.52581 9.624195-32.948413 0.948605L300.447816 511.11484c-9.603729-8.81783-10.229992-23.768333-1.412163-33.372062 8.837272-9.603729 23.768333-10.229992 33.372062-1.412163l154.673755 142.16486L754.644319 342.357322c9.05933-9.362228 24.030299-9.603729 33.392528-0.524956C797.418518 350.912162 797.640576 365.883131 788.56078 375.24536z" p-id="1361" fill="#1dd1a1"></path>
  </svg>
);

const RegisterSuccess = props => (
  <Route path="/register/success" children={({ match }) => (
    <Transition in={Boolean(match)} timeout={duration}>
      {state => (
        <Flex
          className={styles.container}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          direction="column"
        >
          {Icon}
          <WhiteSpace />
          <span className={styles['success-text']}>Great Success</span>
          <WhiteSpace size="xs" />
          <span className={styles['welcome-text']}>Welcome abroad, {props.userInfo.userName}!</span>
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <div className={styles.panel}>
            <WingBlank>
              <Button
                type="primary"
                onClick={props.onCompleteProfile}
              >Complete Your Profile</Button>
              <WhiteSpace />
              <Button
                onClick={props.onBack}
              >Back</Button>
            </WingBlank>
          </div>
        </Flex>
      )}
    </Transition>
  )} />
);

export default RegisterSuccess;
