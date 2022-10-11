import { NavigationAction } from './Layout';

/**
 * Navigation action filter based on Authorization
 */
export const filterNavigationActions = ({
  action,
  isAuthorized
}: FilterNavigationActionProps) => {
  if (action.authFilter === 'always') {
    return true;
  }

  if (isAuthorized && action.authFilter === 'authorized') {
    return true;
  }

  return (!isAuthorized && action.authFilter === 'unauthorized')
}

interface FilterNavigationActionProps {
  action: NavigationAction;
  isAuthorized?: boolean;
}
