import { getComponetDisplayName } from '../utils';


export default (HOCName, WrappedComponent) => target => {
  target.displayName = `${HOCName}(${getComponetDisplayName(WrappedComponent)})`;
};
