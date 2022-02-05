const selectIsLoggedIn = state => state.auth.isLoggedIn;
const selectUsername = state => state.auth.user.name;
const selectIsRefreshing = state => state.auth.isRefreshing;

const authSelectors = {
  selectIsLoggedIn,
  selectUsername,
  selectIsRefreshing,
};
export default authSelectors;
