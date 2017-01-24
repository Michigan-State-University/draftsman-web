let output;

let oneconnect = "create ltm profile one-connect $VANITY_URL_oneconnect"
let profile_http_compression = "create ltm profile http-compression $VANITY_URL_httpcompression defaults-from httpcompression"




// let http_compression = "create ltm profile http-compression $MAU_$TEAM_$APP_NAME_oneconnect"
let node = "tmsh create ltm node $NODE_FQDN address $NODE_IP"
let virtual_server = "tmsh create ltm virtual $MAU_$TEAM_$APP_NAME_80_vs destination $VS_IP:";
function generateCode() {
  output = "tmsh" + "\r\n\r\n";
  if ( $("#createOneConnect").is(":checked") ) {
      output = output + "# Create OneConnect Profile" + "\r\n";
      output = output + oneconnect + "\r\n";
  }
  if ( $("#createHttpCompression").is(":checked") ) {
      output = output + "# Create HTTP Compression Profile" + "\r\n";
      output = output + profile_http_compression + "\r\n\r\n";
  }

  // output = output.replace(/\$mau/gi, document.getElementById('mau').value.toLowerCase());
  // output = output.replace(/\$team/gi, document.getElementById('team_name').value.toLowerCase());
  // output = output.replace(/\$app_name/gi, document.getElementById('application_name').value.toLowerCase());
  // output = output.replace(/\$node_fqdn/gi, document.getElementById('pool_member_fqdn_1').value);
  // output = output.replace(/\$node_ip/gi, document.getElementById('pool_member_ip_1').value);
  // output = output.replace(/\$vs_ip/gi, document.getElementById('vs_ip').value);

  output = output.replace(/\$VANITY_URL/gi, $("#vanity_url").val());
  // output = virtual_server.replace("{{vs_mau}}", document.getElementById('inputMAU').value);
  // output = output.replace("{{vs_name}}", document.getElementById('inputURL').value);
  // output = output.replace("{{vs_addr}}", document.getElementById('inputVIP').value);

  document.getElementById('generatedCode').value="";
  document.getElementById('generatedCode').value=output;

  // tmsh create ltm node <node name> address <IP address>
  // tmsh create ltm pool <pool name> members add { <node name>:<port> }


};
