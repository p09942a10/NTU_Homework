const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  user_id: state => state.user.user_id,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  email: state => state.email.avatar,
  available_time: state => state.user.available_time,
  gender: state => state.user.gender,
  phone: state => state.user.phone,
  birthday: state => state.user.birthday,
  role: state => state.user.role
}
export default getters
