/**
 * Created by Timofey Novitskiy on 24.11.2015.
 */




window.restReportService = '_reportServerUrl1_';
window.restService = /*replace to=^${restServiceUrl}^ if=^debug=false^*/'http://localhost:18080/tes-services/'/*/replace*/;
window.birtServer = 'birtServerUrl';
window.rootPath = '_rootPath_';


dojo.require("dojo.layout.LayoutContainer");
dojo.require("dojo.layout.ContentPane");
dojo.require("dojo.form.TextBox");


/*replace to=^dojo^ pattern=^dijit^ if=^not_test^*/
dojo.require("dijit.layout.LayoutContainer");
/*/replace*/