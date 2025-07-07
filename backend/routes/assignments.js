router.get('/:classroomId', async (req, res) => {
  const { classroomId } = req.params;

  try {
    const now = new Date();

    const assignments = await Assignment.find({
      classroomId,
      deadline: { $gte: now },
    }).sort({ deadline: 1 });

    res.status(200).json(assignments);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});
