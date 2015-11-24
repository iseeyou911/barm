/**
 * Created by Timofey Novitskiy on 24.11.2015.
 */

//define reportServerUrl='_reportServerUrl1_'
//define debug=true

window.restReportService = /*replace to=^${reportServerUrl}^*/'http://localhost:28080/tes-report/'/*/replace*/;
window.restService = /*replace to=^${restServiceUrl}^ if=^debug=false^*/'http://localhost:18080/tes-services/'/*/replace*/;
window.birtServer = /*replace to=^'birtServerUrl'^*/'http://localhost:18080/tes-services/'/*/replace*/;
window.rootPath = /*replace to=^${rootPath}^ if=^test=true^*/'/'/*/replace*/;

/*replace to=^dojo^ pattern=^dijit^*/
dojo.require("dijit.layout.LayoutContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.form.TextBox");
/*/replace*/

/*replace to=^dojo^ pattern=^dijit^ if=^not_test^*/
dojo.require("dijit.layout.LayoutContainer");
/*/replace*/