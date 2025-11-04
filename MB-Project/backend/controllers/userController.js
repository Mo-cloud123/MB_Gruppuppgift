export function me(req, res) {
  // Kommer använda requireAuth senare
  res.json({ user: req.user || null });
}

