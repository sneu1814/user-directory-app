const UserModal = ({
  user,
  onClose
}) => {
  if (!user) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        onClick={(e) => e.stopPropagation()}
      
        <h2>{user.name}</h2>

        <p>
          <strong>Phone:</strong>
          {user.phone}
        </p>

        <p>
          <strong>Website:</strong>
          {user.website}
        </p>

        <p>
          <strong>Company:</strong>
          {user.company.name}
        </p>

        <p>
          <strong>Address:</strong>
          {user.address.street},
          {user.address.city}
        </p>

        <button onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
};

export default UserModal;