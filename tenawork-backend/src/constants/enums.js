/** @enum {string} */
const UserRole = {
  EMPLOYEE: 'employee',
  EMPLOYER: 'employer',
  ADMIN: 'admin',
};

/** @enum {string} */
const JobType = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship',
  REMOTE: 'remote',
};

/** @enum {string} */
const MatchStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

module.exports = { UserRole, JobType, MatchStatus };
