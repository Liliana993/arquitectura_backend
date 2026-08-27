
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      // Verificar si el usuario está autenticado y tiene un rol válido
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Verificar si el rol del usuario está incluido en los roles permitidos
      if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Access denied, insufficient permissions' });
      }
      next();
    };
};

