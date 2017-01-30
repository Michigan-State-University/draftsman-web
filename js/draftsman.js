$(document).ready(function(){
    let poolMemberNext = 0;
    $(".add-more").click(function(e){
        e.preventDefault();
        var addToPoolMemberFqdn = "#pool_member_fqdn_" + poolMemberNext;
        var addToPoolMemberIp = "#pool_member_ip_" + poolMemberNext;
        var addToPoolMemberPort = "#pool_member_port_" + poolMemberNext;
        poolMemberNext = poolMemberNext + 1;
        var newFqdnIn = '<input autocomplete="off" type="text" class="form-control" id="pool_member_fqdn_' + poolMemberNext + '" value="">';
        var newFqdnInput = $(newFqdnIn);
        $(addToPoolMemberFqdn).after(newFqdnInput);
        var newIpIn = '<input autocomplete="off" type="text" class="form-control" id="pool_member_ip_' + poolMemberNext + '" value="">';
        var newIpInput = $(newIpIn);
        $(addToPoolMemberIp).after(newIpInput);
        var newPortIn = '<input autocomplete="off" type="text" class="form-control" id="pool_member_port_' + poolMemberNext + '" value="">';
        var newPortInput = $(newPortIn);
        $(addToPoolMemberPort).after(newPortInput);
        $('.form-control').on('blur', function(e){
          code_generator();
        });
    });

    $('.form-control').on('blur', function(e){
      code_generator();
    });

    $("form input:checkbox").change(function() {
      code_generator();
    });

    $("form select").change(function() {
      code_generator();
    });

    $("#generateCode").click(function(e){
      e.preventDefault();
      code_generator();
    });
});

function code_generator() {
  let output;
  let _vanity_url = $("#vanity_url").val();
  _vanity_url = _vanity_url.replace(/www./gi, "");;
  let _vs_ip = $("#vs_ip").val();
  let _vs_description = $("#vs_description").val();
  let _vs_snat_pool = $("#vs_snat_pool").val();
  let _monitor_protocol = $("#monitor_protocol").val();
  let _monitor_uri = $("#monitor_uri").val();
  let _oneconnect = "create ltm profile one-connect $VANITY_URL_oneconnect";
  let _profile_http_compression = "create ltm profile http-compression $VANITY_URL_httpcompression defaults-from httpcompression";
  let _ssl_client = 'create ltm profile client-ssl $VANITY_URL_clientssl defaults-from clientssl-insecure-disable'
  let _node = 'create ltm node $NODE_FQDN address $NODE_IP';
  let _monitor = 'create ltm monitor $MONITOR_PROTOCOL $VANITY_URL_monitor send "GET /$MONITOR_URI HTTP/1.1\\r\\nHost: $VANITY_URL\\r\\nConnection: Close\\r\\n\\r\\n" recv "HTTP\/1\.(0|1) (2|3|401)"';
  let _pool = 'create ltm pool $VANITY_URL_pool monitor $VANITY_URL_monitor';
  let _pool_member = 'modify ltm pool $VANITY_URL_pool members add {$NODE_FQDN:$NODE_PORT} ';
  let _virtual_server_80 = 'create ltm virtual $VANITY_URL_80_vs destination $VS_IP:80 description "Campus - $VS_DESCRIPTION" source-address-translation { pool $VS_SNAT_POOL type snat } profiles add { mptcp-mobile-optimized { context clientside } tcp-lan-optimized { context serverside } default-http { } $VANITY_URL_oneconnect { } $VANITY_URL_httpcompression { } } persist replace-all-with { _msu_encrypted_cookie { default yes } } fallback-persistence source_addr rules { /Common/_msu_http_to_https_301_redirect }';
  let _virtual_server_443 = 'create ltm virtual $VANITY_URL_443_vs destination $VS_IP:443 description "Campus - $VS_DESCRIPTION" source-address-translation { pool $VS_SNAT_POOL type snat } profiles add { mptcp-mobile-optimized { context clientside } tcp-lan-optimized { context serverside } default-https { } $VANITY_URL_clientssl { context clientside } $VANITY_URL_oneconnect { } $VANITY_URL_httpcompression { } } persist replace-all-with { _msu_encrypted_cookie { default yes } } fallback-persistence source_addr pool $VANITY_URL_pool rules { /Common/_msu_enable_strict_transport_security /Common/_msu_jboss_admin_discard /Common/_msu_remove_server_and_powered_by }';
  let poolMemberCount = 0;
  poolMemberCount = $(":input[id^=pool_member_ip_]").length;

  output = "tmsh" + "\r\n";

  if ( $("#createNode").is(":checked") ) {
    if ( poolMemberCount > 0 ) {
      output = output + "\r\n" + "# Create Nodes" + "\r\n";
      let count = 0;
      let fqdn = "";
      let ip = "";
      let node = "";
      while (count < poolMemberCount) {
        fqdn = $("#pool_member_fqdn_" + count).val();
        fqdn_length = fqdn.trim().length;
        ip = $("#pool_member_ip_" + count).val();
        if ( fqdn_length > 0 ) {
          node = _node;
          node = node.replace(/\$NODE_FQDN/gi, fqdn);
          node = node.replace(/\$NODE_IP/gi, ip);
          output = output + node + "\r\n";
        };
        count++;
      };
    };
  }

  if ( $("#createPoolMonitor").is(":checked") ) {
      output = output + "\r\n" + "# Create Pool Monitor" + "\r\n";
      output = output + _monitor + "\r\n";
  }

  if ( $("#createPool").is(":checked") ) {
      output = output + "\r\n" + "# Create Pool" + "\r\n";
      output = output + _pool + "\r\n";
      if ( poolMemberCount > 0 ) {
        output = output + "\r\n" + "# Create Pool Members" + "\r\n";
        let count = 0;
        let fqdn = "";
        let ip = "";
        let pool_member = "";
        while (count < poolMemberCount) {
          fqdn = $("#pool_member_fqdn_" + count).val();
          fqdn_length = fqdn.trim().length;
          port = $("#pool_member_port_" + count).val();
          if ( fqdn_length > 0 ) {
            pool_member = _pool_member;
            pool_member = pool_member.replace(/\$NODE_FQDN/gi, fqdn);
            pool_member = pool_member.replace(/\$NODE_PORT/gi, port);
            output = output + pool_member + "\r\n";
          };
          count++;
        };
      };
  }

  if ( $("#createOneConnect").is(":checked") ) {
      output = output + "\r\n" + "# Create OneConnect Profile" + "\r\n";
      output = output + _oneconnect + "\r\n";
  }

  if ( $("#createHttpCompression").is(":checked") ) {
      output = output + "\r\n" + "# Create HTTP Compression Profile" + "\r\n";
      output = output + _profile_http_compression + "\r\n";
  }

  if ( $("#createClientSSL").is(":checked") ) {
      output = output + "\r\n" + "# Create Client SSL" + "\r\n";
      output = output + _ssl_client + "\r\n";
  }

  if ( $("#createVirtualServer").is(":checked") ) {
      output = output + "\r\n" + "# Create Virtual Server" + "\r\n";
      output = output + _virtual_server_80 + "\r\n";
      output = output + _virtual_server_443 + "\r\n";
  }





  // Final replacement of global variables
  output = output.replace(/\$VANITY_URL/gi, _vanity_url);;
  output = output.replace(/\$MONITOR_PROTOCOL/gi, _monitor_protocol);;
  output = output.replace(/\$MONITOR_URI/gi, _monitor_uri);;
  output = output.replace(/\$VS_IP/gi, _vs_ip);;
  output = output.replace(/\$VS_DESCRIPTION/gi, _vs_description);;
  output = output.replace(/\$VS_SNAT_POOL/gi, _vs_snat_pool);;


  // Output the generated commands
  $("#generatedCode").val(output);
};
