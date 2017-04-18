$(document).ready(function (){
  $('.form-control').on('blur', function(e){
    code_generator();
  });

});

function code_generator() {
  var device_a = "";
  var device_b = "";
  var _environment = $("#environment").val().trim();
  var _direction = $("#direction").val().trim();
  var _admin_password = $("#admin_password").val().trim();
  var _mac_masquerade = $("#mac_masquerade").val().trim();
  var _config_sync_group = "f5-$ENV-$DIR";
  var _sys_save = 'save /sys config';
  var config_sync_group = _config_sync_group;
  var _dns_servers = "modify /sys dns name-servers add { 35.8.0.4 35.8.0.5 35.8.0.6 35.8.0.7 35.8.0.8 35.8.0.9 }";
  var _ntp_servers = "modify /sys ntp servers add { 35.8.0.4 }";
  var _disable_gui = "modify /sys global-settings gui-setup disabled";
  var _disable_dhcp = "modify /sys db dhclient.mgmt { value \"disable\" }";
  var _enable_smtp_delivery = 'modify /sys outbound-smtp mailhub express.mail.msu.edu:25';
  var _create_vlan_external = 'create /net vlan external interfaces add { 1.1 }';
  var _create_vlan_internal = 'create /net vlan internal interfaces add { 1.2 }';
  var _assign_external_static_ip = "create /net self $F5_EXTERNAL_STATIC_IP address $F5_EXTERNAL_STATIC_IP/24 traffic-group traffic-group-local-only vlan external allow-service default";
  var _assign_external_float_ip = "create /net self $F5_EXTERNAL_FLOAT_IP address $F5_EXTERNAL_FLOAT_IP/24 traffic-group traffic-group-1 vlan external allow-service default";
  var _assign_internal_static_ip = "create /net self $F5_INTERNAL_STATIC_IP address $F5_INTERNAL_STATIC_IP/24 traffic-group traffic-group-local-only vlan internal allow-service default";
  var _assign_internal_float_ip = "create /net self $F5_INTERNAL_FLOAT_IP address $F5_INTERNAL_FLOAT_IP/24 traffic-group traffic-group-1 vlan internal allow-service default";
  var _create_snat = "create /ltm snatpool local_snat_pool members add { $F5_SNAT_POOL_ADDR }";
  var snat_pool_addr = $("#snat_pool").val().trim();
  var _dev_a_dc = $("#device_a_datacenter").val().trim();
  var _dev_b_dc = $("#device_b_datacenter").val().trim();
  var _device_a_mgmt_ip = $("#device_a_mgmt_ip").val().trim();
  var _device_b_mgmt_ip = $("#device_b_mgmt_ip").val().trim();
  var device_a_configsync_ip = $("#device_a_configsync_ip").val().trim();
  var device_b_configsync_ip = $("#device_b_configsync_ip").val().trim();
  var device_a_external_static_ip = $("#device_a_external_static_ip").val().trim();
  var device_a_external_float_ip = $("#device_a_external_float_ip").val().trim();
  var device_a_internal_static_ip = $("#device_a_internal_static_ip").val().trim();
  var device_a_internal_float_ip = $("#device_a_internal_float_ip").val().trim();
  var device_b_external_static_ip = $("#device_b_external_static_ip").val().trim();
  var device_b_internal_static_ip = $("#device_b_internal_static_ip").val().trim();
  var device_a_name = "f5-$ENV-$DC-$DIR";
  var device_b_name = "f5-$ENV-$DC-$DIR";
  var device_a_hostname = "f5-$ENV-$DC-$DIR.itservices.msu.edu";
  var device_b_hostname = "f5-$ENV-$DC-$DIR.itservices.msu.edu";
  var _mac_masquerade_addr = 'modify /cm traffic-group traffic-group-1 mac $F5_MAC_MASQUERADE';
  var _modify_root_pw = "modify /auth password root";
  var _modify_admin_pw = "modify /auth user admin password $ADMIN_PASSWORD";
  var _device_hostname = "modify /sys global-settings hostname f5-$ENV-$DC-$DIR.itservices.msu.edu";
  var _trust_domain_delete = 'delete /cm trust-domain all';
  var _trust_domain_rename = 'mv /cm device bigip1 f5-$ENV-$DC-$DIR.itservices.msu.edu';
  var _trust_domain_config = 'modify /cm device f5-$ENV-$DC-$DIR.itservices.msu.edu configsync-ip $F5_IP_CONFIGSYNC mirror-ip $F5_IP_CONFIGSYNC unicast-address { { effective-ip $F5_IP_CONFIGSYNC effective-port 1026 ip $F5_IP_CONFIGSYNC } }';
  var _trust_domain_peer = 'modify /cm trust-domain /Common/Root ca-devices add { $F5_IP_PEER_MGMT } name f5-$ENV-$DCB-$DIR.itservices.msu.edu username admin password $ADMIN_PASSWORD';
  var _config_sync_create = 'create /cm device-group $F5_CONFIG_SYNC_GROUP type sync-failover devices add { f5-$ENV-$DCA-$DIR.itservices.msu.edu f5-$ENV-$DCB-$DIR.itservices.msu.edu }';
  var _config_sync_init = 'run /cm config-sync to-group $F5_CONFIG_SYNC_GROUP';


  device_a = "tmsh" + "\r\n";
  device_a = device_a + _sys_save + "\r\n";
  device_a = device_a + _modify_root_pw + "\r\n";
  device_a = device_a + _modify_admin_pw + "\r\n";
  device_a = device_a + _device_hostname + "\r\n";
  device_a = device_a + _dns_servers + "\r\n";
  device_a = device_a + _ntp_servers + "\r\n";
  device_a = device_a + _enable_smtp_delivery + "\r\n";
  device_a = device_a + _sys_save + "\r\n";
  device_a = device_a + _disable_gui + "\r\n";
  device_a = device_a + _disable_dhcp + "\r\n";
  device_a = device_a + _create_vlan_external + "\r\n";
  device_a = device_a + _create_vlan_internal + "\r\n";
  device_a = device_a + _assign_external_static_ip + "\r\n";
  device_a = device_a + _assign_external_float_ip + "\r\n";
  device_a = device_a + _assign_internal_static_ip + "\r\n";
  device_a = device_a + _assign_internal_float_ip + "\r\n";
  device_a = device_a + _create_snat + "\r\n";
  device_a = device_a + _trust_domain_delete + "\r\n";
  device_a = device_a + _trust_domain_rename + "\r\n";
  device_a = device_a + _trust_domain_config + "\r\n";
  device_a = device_a + _mac_masquerade_addr + "\r\n";
  device_a = device_a + "####  COMPLETE DEVICE B SETUP BEFORE PROCEEDING! ####" + "\r\n";
  device_a = device_a + _trust_domain_peer + "\r\n";
  device_a = device_a + _config_sync_create + "\r\n";
  device_a = device_a + _config_sync_init + "\r\n";
  device_a = device_a + _sys_save + "\r\n";

  device_b = "tmsh" + "\r\n";
  device_b = device_b + _sys_save + "\r\n";
  device_b = device_b + _modify_root_pw + "\r\n";
  device_b = device_b + _modify_admin_pw + "\r\n";
  device_b = device_b + _device_hostname + "\r\n";
  device_b = device_b + _dns_servers + "\r\n";
  device_b = device_b + _ntp_servers + "\r\n";
  device_b = device_b + _enable_smtp_delivery + "\r\n";
  device_b = device_b + _sys_save + "\r\n";
  device_b = device_b + _disable_gui + "\r\n";
  device_b = device_b + _disable_dhcp + "\r\n";
  device_b = device_b + _create_vlan_external + "\r\n";
  device_b = device_b + _create_vlan_internal + "\r\n";
  device_b = device_b + _assign_external_static_ip + "\r\n";
  device_b = device_b + _assign_internal_static_ip + "\r\n";
  device_b = device_b + _sys_save + "\r\n";



  config_sync_group = config_sync_group.replace(/\$ENV/gi, _environment);
  config_sync_group = config_sync_group.replace(/\$DIR/gi, _direction);

  device_a = device_a.replace(/\$DCA/gi, _dev_a_dc);
  device_a = device_a.replace(/\$DCB/gi, _dev_b_dc);
  device_a = device_a.replace(/\$ADMIN_PASSWORD/gi, _admin_password);
  device_a = device_a.replace(/\$ENV/gi, _environment);
  device_a = device_a.replace(/\$DIR/gi, _direction);
  device_a = device_a.replace(/\$DC/gi, _dev_a_dc);
  device_a = device_a.replace(/\$F5_EXTERNAL_STATIC_IP/gi, device_a_external_static_ip);
  device_a = device_a.replace(/\$F5_EXTERNAL_FLOAT_IP/gi, device_a_external_float_ip);
  device_a = device_a.replace(/\$F5_INTERNAL_STATIC_IP/gi, device_a_internal_static_ip);
  device_a = device_a.replace(/\$F5_INTERNAL_FLOAT_IP/gi, device_a_internal_float_ip);
  device_a = device_a.replace(/\$F5_SNAT_POOL_ADDR/gi, snat_pool_addr);
  device_a = device_a.replace(/\$F5_IP_CONFIGSYNC/gi, device_a_configsync_ip);
  device_a = device_a.replace(/\$F5_IP_PEER_MGMT/gi, _device_b_mgmt_ip);
  device_a = device_a.replace(/\$F5_CONFIG_SYNC_GROUP/gi, config_sync_group);
  device_a = device_a.replace(/\$F5_MAC_MASQUERADE/gi, _mac_masquerade);

  device_b = device_b.replace(/\$DCA/gi, _dev_a_dc);
  device_b = device_b.replace(/\$DCB/gi, _dev_b_dc);
  device_b = device_b.replace(/\$ADMIN_PASSWORD/gi, _admin_password);
  device_b = device_b.replace(/\$DIR/gi, _direction);
  device_b = device_b.replace(/\$ENV/gi, _environment);
  device_b = device_b.replace(/\$DC/gi, _dev_b_dc);
  device_b = device_b.replace(/\$F5_EXTERNAL_STATIC_IP/gi, device_b_external_static_ip);
  device_b = device_b.replace(/\$F5_INTERNAL_STATIC_IP/gi, device_b_internal_static_ip);
  device_b = device_b.replace(/\$F5_IP_CONFIGSYNC/gi, device_b_configsync_ip);
  device_b = device_b.replace(/\$F5_MAC_MASQUERADE/gi, _mac_masquerade);


  $("#device_a_tmsh").val(device_a);
  $("#device_b_tmsh").val(device_b);
}
