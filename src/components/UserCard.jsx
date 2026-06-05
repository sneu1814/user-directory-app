const UserCard = ({
  user,
  onSelect
}) => {
  return (
    <div
      className="user-card"
      onClick={() => onSelect(user)}
    >
      <h3>{user.name}</h3>

      <p>📧{user.email}</p>

      <p>🏢{user.company.name}</p>

      <p>📍{user.address.city}</p>

      <button className="details-btn">View Details</button>
    </div>
  );
};

export default UserCard;