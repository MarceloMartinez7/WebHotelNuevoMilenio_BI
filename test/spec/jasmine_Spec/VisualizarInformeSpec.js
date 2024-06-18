// reportHelperSpec.js
const ReportService = require('./ReportService');
const ReportHelper = require('./ReportHelper');

describe('ReportHelper', function() {
    let reportHelper;

    beforeEach(function() {
        reportHelper = new ReportHelper();
    });

    it('should generate a report for the specified period', function() {
        const startDate = '2024-06-01';
        const endDate = '2024-06-30';
        const generatedReport = reportHelper.getReport(startDate, endDate);
        
        // Verificar que el informe generado contiene las fechas especificadas
        expect(generatedReport).toContain(startDate);
        expect(generatedReport).toContain(endDate);
    });

    // Agregar más pruebas según sea necesario
});
