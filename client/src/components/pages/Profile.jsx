function Profile({ user }) {
  return (
    <div>
      <h2>{user?.data?.name}</h2>
    </div>
  );
}

export default Profile;
