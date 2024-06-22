function bindOcxEvents(){try{$("ocx").AddEventListener("TransEvent",handlerOcxEvents.fireOcxEvent),$("ocx").AddEventListener("SetNetPlayRecordStatus",handlerOcxEvents.fileStatus),$("ocx").AddEventListener("SetNetPlayFileInfo",handlerOcxEvents.playFileInfo),$("ocx").AddEventListener("NetPlayTimeInform",handlerOcxEvents.NetPlayTimeInform),$("ocx").AddEventListener("StateChanged",handlerOcxEvents.StateChanged),$("ocx").AddEventListener("InsertNetRecordFileInfo",handlerOcxEvents.InsertNetRecordFileInfo),$("ocx").AddEventListener("FileDialogInfo",handlerOcxEvents.FileDialogInfo),$("ocx").AddEventListener("SelectMultiFile",handlerOcxEvents.SelectMultiFile),$("ocx").AddEventListener("OutPutStringInfo",handlerOcxEvents.OutPutStringInfo),$("ocx").AddEventListener("SynopsisClickInfo",handlerOcxEvents.SynopsisClickInfo),$("ocx").AddEventListener("VideoAnalyzeConfig",handlerOcxEvents.fireOcxEvent)}catch(a){bindOcxEvents.delay(500)}}function bindTimeaxesEvents(){try{$("timeaxes")&&($("timeaxes").AddEventListener("OnOpenNetPlayByTime",handlerOcxEvents.OnOpenNetPlayByTime),$("timeaxes").AddEventListener("BackUpBeginTimeChanged",handlerOcxEvents.BackUpBeginTimeChanged),$("timeaxes").AddEventListener("BackUpEndTimeChanged",handlerOcxEvents.BackUpEndTimeChanged),$("timeaxes").AddEventListener("mouseAndKeyActive",handlerOcxEvents.mouseAndKeyActiveEvent))}catch(a){bindTimeaxesEvents.delay(500)}}function FireStateChangedEx(a,b,c,d){g_frames.preview.FireStateChangedEx(a,b,c,d)}function FireReturnWindInfo(a,b,c,d,e,f,g){g_frames.preview.FireReturnWindInfo(a,b,c,d,e,f,g)}function FireReturnPlayState(a){g_frames.preview.FireReturnPlayState(a)}var handlerOcxEvents={fireOcxEvent:function(a){var b=JSON.decode(a),c=[],d=0;for(var e in b.EventParam)c[d++]=b.EventParam[e];handlerOcxEvents[b.EventName]&&handlerOcxEvents[b.EventName](b.EventParam)},StateChanged:function(a,b,c,d){if(1==arguments.length){var e=arguments[0];a=e.channel,b=e.state,c=e.winID,d=e.streamtype}FireStateChangedEx(a,b,c,d)},NetPlayTimeInform:function(a){"Playback"==g_mode&&PlayBack&&PlayBack.SetNetPlayTime(a),5==g_pageID&&Page.IntelPlay.firePlayTimeNew(a)},ReturnLocalState:function(a){FireReturnPlayState(a)},ReturnWindInfo:function(a){"Playback"==g_mode?PlayBack&&PlayBack.setSelChannel&&PlayBack.setSelChannel(a.winID,a.channel):FireReturnWindInfo(a.winID,a.channel,a.state,a.ptz,a.fluency,a.quality,a.vertical),$chk(a.fisheyeinfo)&&"Preview"===g_mode&&g_frames.preview.showFishEye(a),g_useApp&&"Preview"===g_mode&&handlerOcxEvents.ActiveWinNacl&&handlerOcxEvents.ActiveWinNacl(a),$chk(a.MultiScreeninfo)&&"Preview"===g_mode&&g_frames.preview.showMultiScreen(a),"Preview"===g_mode&&g_frames&&g_frames.preview&&g_frames.preview.MasterSlave.setWinUI(a)},PTZPosition:function(a){var b=new Class({initialize:function(a,b){this.x=a,this.y=b}}),c=function(a,c){return new b(parseInt(8192*(a.x-c.x)*2/d),parseInt(8192*(a.y-c.y)*2/d))},d=a.winWidth-0,e=a.winHight-0,f=a.isReverse?1:-1,g=0,h=new b(a.selRegion.left-0,a.selRegion.top-0),i=new b(a.selRegion.right-0,a.selRegion.bottom-0),j=new b(d/2,e/2),k=new Object;if(h.x==i.x||h.y==i.y)g=0,k=c(i,j);else{g=f*Math.abs(d*e/((i.x-h.x)*(i.y-h.y))).round();var l=new b(Math.abs((i.x+h.x)/2).round(),Math.abs((i.y+h.y)/2).round());k=c(l,j)}if("Preview"===g_mode){var m=g_frames.preview.MasterSlave.relocation(h.x,h.y,i.x,i.y,d,e,f);if(m)return;g_frames.preview.controlPtz(!0,"Position",k.x,k.y,g)}else Page.MasterSlave&&(a.Direction?Page.MasterSlave.controlPtz(a.start,a.Direction):Page.MasterSlave.controlPtz(a.start,"Position",k.x,k.y,g))},DownloadByFilePos:function(a){var b=a.speed,c=a.pos,d=a.end;PlayBack.downLoadProgress(b,c,d)},fileStatus:function(a){"array"==$type(a)&&(a=a.join("")),PlayBack&&PlayBack.setDayHaveFile(a)},playFileInfo:function(a,b){1==g_pageID&&PlayBack&&PlayBack.parseFileInfo(a,b)},OnGetRemoteDevPicture:function(a){Page.remoteDevice.Tab.adddevice.getPictureOcx(a.picStr)},NetPlayState:function(a){PlayBack&&PlayBack.NetPlayState(a.winID,a.channel,a.open,a.speed,a.state,a.direction,a.fisheyeinfo),$chk(a.fisheyeinfo)&&"Playback"===g_mode&&"backwards"!=a.state&&"preFrame"!=a.state&&"backFrame"!=a.state&&PlayBack&&PlayBack.showFishEye(a),g_useApp&&"Playback"===g_mode&&handlerOcxEvents.ActiveWinNacl&&handlerOcxEvents.ActiveWinNacl(a),$chk(a.MultiScreeninfo)&&"Playback"===g_mode&&"backwards"!=a.state&&"preFrame"!=a.state&&"backFrame"!=a.state&&PlayBack&&PlayBack.showMultiScreen(a),5==g_pageID&&Page.IntelPlay.firePlayState(a.state,a.winID),2==g_pageID&&Page&&Page.MasterSlave&&Page.MasterSlave.changeSub(a.winID,a.channel,a.open,a.speed,a.state,a.direction)},OnOpenNetPlayByTime:function(a,b){PlayBack&&PlayBack.PlayBackByTime(a,b)},DownloadByFilePos:function(a){1==g_pageID?PlayBack&&PlayBack.downLoadProgress(a.end,a.pos,a.speed,0,a.FileInfo,a.fileIndex):5==g_pageID&&Page.IntelPlay&&Page.IntelPlay.downLoadProgress(a.end,a.pos,a.speed,0,a.FileInfo,a.fileIndex)},DownloadSizeProcess:function(a){Page.IntelPlay&&Page.IntelPlay.downloadSizeProcess(a.downloadDataSize,a.end,a.totalDataSize,a.httpDownloadTaskID)},RemoteFileDownloadResult:function(a){Page.IntelPlay&&Page.IntelPlay.RemoteFileDownloadResult(a)},BatchDownloadProcess:function(a){Page.IntelPlay&&Page.IntelPlay.batchDownloadProcess(a.downloadcount,a.totalcount)},DownloadByTimePos:function(a){PlayBack&&PlayBack.downLoadProgress(a.end,a.pos,a.speed,1)},BackUpBeginTimeChanged:function(a,b){PlayBack&&PlayBack.BackUpTimeChanged(a,b,0)},BackUpEndTimeChanged:function(a,b){PlayBack&&PlayBack.BackUpTimeChanged(a,b,1)},WaterMarkPos:function(a){0!=a.total&&DownMore.fireWaterMarkPos(a.pos/a.total,a.status)},WaterMarkInfo:function(a){DownMore.fireWaterMarkInfo(a.waterMark,a.errType,a.time)},QueryItemInfo:function(a){1==g_pageID&&DownMore.fireRecNumInfo(a.LastItem,a.ItemTotal)},InsertNetRecordFileInfo:function(a,b,c){1==g_pageID?DownMore.fireNewRecordFileInfo(a,b,c):5==g_pageID&&Page.IntelPlay.fireNewRecordFileInfo(a,b,c)},SelectMultiFile:function(a){Page.facedataBase.selectFilelist(JSON.decode(a))},FileDialogInfo:function(a,b){if("array"==$type(a)&&(b=a[1],a=a[0]),""!=a||""!=b)if(1==g_pageID)""!=a&&(""!=b?DownMore.fireDialogInfo(a,b):DownMore.changePathOcx(a));else if(3==g_pageID)g_frames.alarm.fireDialogInfo(a,b);else if(4==g_pageID)if(window.writeFileInfo)window.writeFileInfo(a,b);else{var c=jQuery("#info-menu li.set-item-current");if(c){var d=c.attr("filename"),e=jQuery("div[data-for = "+d+"]").find("li.current");e&&(d=e.attr("data-for")),Page[d]&&Page[d].fireDialogInfo&&Page[d].fireDialogInfo(a,b)}}else 5==g_pageID?Page.IntelPlay.fireDialogInfo(a,b):fireDialogInfo(a,b)},WebPluginInfo:function(a){var b="";switch(a.Code){case"0":0==a.SubCode?b=tl("opr_ocx.Compression playback failed"):1==a.SubCode?b=tl("opr_ocx.function failed"):2==a.SubCode&&(b=tl("opr_ocx.Insufficient resources"));break;case 1:b=tl("opr_ocx.Stop talking first!");break;case 2:b=tl("opr_ocx.Stop talking first!");break;case 3:b=tl("opr_ocx.No Right");break;case 4:0==a.SubCode?b=tl("fisheye_nosupport"):1==a.SubCode&&(b=tl("com_msg.multiscreen_nosupport"));break;case 5:0==a.SubCode?b=tl("conf_ivs.fish.fisheye"):1==a.SubCode&&(b=tl("com_msg.fish.notfishstream"));break;case 6:0==a.SubCode?b=tl("opr_ocx.Close Channel Audio first!"):3==a.SubCode||85==a.SubCode?b=tl("com_msg.netovertime"):120==a.SubCode||380==a.SubCode?b=tl("com_error.FailedTalkToIpcBroadcast"):(515==a.SubCode||-1==a.SubCode)&&(b=tl("opr_ocx.micSource"));break;case 7:b=tl("opr_ocx.Capture Picture faild!");break;default:b=a.Description}var c="";0==g_pageID?c="Preview":1==g_pageID&&(c="Playback",jQuery("#timeaxes").css("height","0")),jQuery("#f_ocx")&&jQuery("#f_ocx").css("z-index","9999"),window.changeOcxMode&&changeOcxMode("Hidden"),jQuery.alert(b,function(){jQuery("#f_ocx").css("z-index","99999"),window.changeOcxMode&&changeOcxMode(c),1==g_pageID&&jQuery("#timeaxes").css("height","100%")},!1)},BackupDeviceList:function(a){DownMore.BackupDeviceList(a)},RemoteBackupPos:function(a){DownMore.backupProgress(a.end,a.pos,a.speed)},AutoDeviceConnected:function(){var a=HashCookie.get("username"),b={timer:1e3,maxcount:10},c=0,d=setInterval(function(){function e(){c++,c>b.maxcount&&clearInterval(d)}function f(){$.publish("restart"),clearInterval(d),setTimeout("alive(300)",1e3)}RPC.login(a,g_autoPassword).done(function(){f(),parent.refreshSessionID(),parent.g_frames.alarm.alarmReConnect(),parent.g_frames.preview.autoReConnect(),parent.webApp.Common.devNotify.comet&&parent.webApp.Common.devNotify.reconnect()}).fail(e)},b.timer)},OutPutStringInfo:function(a,b){var c="";if($("xznhf").hasClass("main-nav-item-current"))c="IntelPlay";else if($("xxtpz").hasClass("main-nav-item-current")){var d=jQuery("#setup-menu li.set-item-current");d&&(c=d.attr("filename"))}switch(c){case"IntelPlay":"OutPutShapeRect"==a&&Page.IntelPlay.OutPutShapeRect(b),"OutPutObjectRect"==a&&Page.IntelPlay.setFilterValue(b);break;case"videodetect":"MotionDetect"==a&&(Page.videodetect&&Page.videodetect.PluginMotion?Page.videodetect.PluginMotion.ocxInfo(b):Page.videoDecectZone&&Page.videoDecectZone.PluginMotion&&Page.videoDecectZone.PluginMotion.ocxInfo(b));break;case"ipcIntellentNewConfig":"OutPutShapeRect"==a&&Page.ipcIntellentNewConfig&&Page.ipcIntellentNewConfig.Tab["public"].OutPutShapeRect(b),"OutPutObjectRect"==a&&Page.ipcIntellentNewConfig&&Page.ipcIntellentNewConfig.Tab["public"].setFilterValue(b);break;case"ipcFaceNewConfig":"OutPutObjectRect"==a&&Page.ipcFaceNewConfig.plugin&&Page.ipcFaceNewConfig.plugin.setFilterValue(b);break;case"vehicledetect":"OutPutShapeRect"==a&&Page.vehicledetect&&Page.vehicledetect.OutPutShapeRect(b);break;case"IVSConfig":"OutPutShapeRect"==a&&Page.IVSConfig&&Page.IVSConfig.OutPutShapeRect(b),"OutPutObjectRect"==a&&Page.IVSConfig&&Page.IVSConfig.setFilterValue(b),"OutPutRuleRect"==a&&Page.IVSConfig&&Page.IVSConfig.OutPutRuleRect&&Page.IVSConfig.OutPutRuleRect(b),"OutPutGlobalCalibrateInfo"==a&&Page.IVSGlobal&&Page.IVSGlobal.OutPutGlobalCalibrateInfo(b),"OutPutCheckedInfo"==a&&Page.IVSGlobal&&Page.IVSGlobal.OutPutCheckedInfo(b);break;case"flowrateConfig":"OutPutShapeRect"===a?Page.flowrateConfig&&Page.flowrateConfig.OutPutShapeRect(b):"OutPutObjectRect"===a&&Page.flowrateConfig&&Page.flowrateConfig.setFilterValue(b);break;case"faceAnalysis":"OutPutObjectRect"===a&&Page.faceAnalysis&&Page.faceAnalysis.setFilterValue(b);break;case"fireAlarmConfig":"MotionDetect"==a?Page.firedetect.PluginMotion.ocxInfo(b):"OutPutShapeRect"==a?Page.fireVisible.OutPutShapeRect(b):"OutPutObjectRect"==a&&Page.fireVisible.setFilterValue(b)}},SynopsisClickInfo:function(a){Page.IntelPlay.playOriginal(a)},NotifyCalibrationValue:function(a){0===a.index&&Page.MasterSlave&&Page.MasterSlave.NotifyCalibration(a.point)},MasterSlaveTrackerOperation:function(a){0===g_pageID&&g_frames.preview.MasterSlave.showTracker(a)},MasterSlaverTrack:function(a){0===g_pageID&&g_frames.preview.MasterSlave.setLocate(a)},VideoAnalyzeConfig:function(a){if(3==a.EventParam.ShapeState){var b="";if($("xznhf").hasClass("main-nav-item-current"))b="IntelPlay";else if($("xxtpz").hasClass("main-nav-item-current")){var c=jQuery("#setup-menu li.set-item-current");if(c){var b=c.attr("filename"),d=jQuery("div[data-for = "+b+"]").find("li.current");d.length>0&&(b=d.attr("data-for"))}}""!=b&&Page[b]&&Page[b].fireIVSInfoNacl&&Page[b].fireIVSInfoNacl(a)}},MousePosition:function(a){g_frames.preview.PointTemper.FireReturnPoint(a)},EventLine:function(a){2==g_pageID&&Page.temperConfig&&Page.temperConfig._receiveShapeData(a)},EventArea:function(a){2==g_pageID&&Page.temperConfig&&Page.temperConfig._receiveShapeData(a)},EventSpot:function(a){2==g_pageID&&Page.temperConfig&&Page.temperConfig._receiveShapeData(a)},GetLastPosition:function(a){2==g_pageID&&Page.MasterSlave&&(Page.MasterSlave.getShapeID(a.ShapeID),Page.MasterSlave.NotifyCalibration({X:a.ShapeData[0][0],Y:a.ShapeData[0][1]}))},Lock:function(a){g_frames.preview.MasterSlave.lockSlaver(a)},AuthManuCtr:function(a){if(!a.Right){var b="";0==g_pageID?b="Preview":1==g_pageID&&(b="Playback",jQuery("#timeaxes").css("height","0")),jQuery("#f_ocx")&&jQuery("#f_ocx").css("z-index","9999"),window.changeOcxMode&&changeOcxMode("Hidden"),jQuery.alert(tl("opr_ocx.No Right"),function(){jQuery("#f_ocx").css("z-index","99999"),window.changeOcxMode&&changeOcxMode(b),1==g_pageID&&jQuery("#timeaxes").css("height","100%")},!1)}},mouseAndKeyActiveEvent:function(){$j.publish("ocx.active")}};