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
    });

    $("#generateCode").click(function(e){
      e.preventDefault();
      let output;
      let _vanity_url = $("#vanity_url").val();
      let _monitor_protocol = $("#monitor_protocol").val();
      let _monitor_uri = $("#monitor_uri").val();
      let _oneconnect = "create ltm profile one-connect $VANITY_URL_oneconnect";
      let _profile_http_compression = "create ltm profile http-compression $VANITY_URL_httpcompression defaults-from httpcompression";
      let _node = 'create ltm node $NODE_FQDN address $NODE_IP';
      let _monitor = 'create ltm monitor $MONITOR_PROTOCOL $VANITY_URL_monitor send "GET /$MONITOR_URI HTTP/1.1\\r\\nHost: $VANITY_URL\\r\\nConnection: Close\\r\\n\\r\\n" recv "HTTP\/1\.(0|1) (2|3|401)"';
      let _pool = "create ltm pool $NODE_FQDN address $NODE_IP";
      let virtual_server = "tmsh create ltm virtual $MAU_$TEAM_$APP_NAME_80_vs destination $VS_IP:";
      let poolMemberCount = 0;
      poolMemberCount = $(":input[id^=pool_member_ip_]").length;

      output = "tmsh" + "\r\n";
      if ( $("#createOneConnect").is(":checked") ) {
          output = output + "\r\n" + "# Create OneConnect Profile" + "\r\n";
          output = output + _oneconnect + "\r\n";
      }
      if ( $("#createHttpCompression").is(":checked") ) {
          output = output + "\r\n" + "# Create HTTP Compression Profile" + "\r\n";
          output = output + _profile_http_compression + "\r\n";
      }

      if ( $("#createPoolMonitor").is(":checked") ) {
          output = output + "\r\n" + "# Create Pool Monitor" + "\r\n";
          output = output + _monitor + "\r\n";
      }

      if ( poolMemberCount > 0 ) {
        console.log("Pool Members Found: " + poolMemberCount);
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
        output = output + "\r\n";
      };

      // Final replacement of global variables
      output = output.replace(/\$VANITY_URL/gi, _vanity_url);;
      output = output.replace(/\$MONITOR_PROTOCOL/gi, _monitor_protocol);;
      output = output.replace(/\$MONITOR_URI/gi, _monitor_uri);;

      // Output the generated commands
      $("#generatedCode").val(output);
    });
});
