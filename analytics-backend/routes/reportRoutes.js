const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const roleRequired = require('../middleware/roleRequired');
const reportController = require('../controllers/reportController');

router.get(
  '/dashboard',
  authRequired,
  roleRequired('super_admin', 'analyst'),
  reportController.showDashboard
);

router.get(
  '/reports',
  authRequired,
  roleRequired('super_admin', 'analyst', 'viewer'),
  reportController.showReports
);

router.get(
  '/reports/pages',
  authRequired,
  roleRequired('super_admin', 'analyst', 'viewer'),
  reportController.showPageEngagement
);

router.get(
  '/reports/exits',
  authRequired,
  roleRequired('super_admin', 'analyst', 'viewer'),
  reportController.showExitDistribution
);

router.get(
  '/reports/export',
  authRequired,
  roleRequired('super_admin', 'analyst', 'viewer'),
  reportController.exportReportsPdf
);

router.get(
  '/exports/:filename',
  authRequired,
  roleRequired('super_admin', 'analyst', 'viewer'),
  reportController.viewExport
);

module.exports = router;
