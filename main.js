/*音频信息*/var au=document.createElement("audio");au.preload="auto";au.src="./msg.mp3";var sId;var sVolume=0;var sPalybackRate=1.99;var runff=true;
function gotonextcourse(){var clickflag=false;var nowscope=$(".basic.ng-scope.complete").parent();if(nowscope.length==0){nowscope=$(".resourcelist")}nowscope.children().each(function(){if(!$(this).is(".complete")){var icot=$(this).children(".tag-source-ico");if(icot.attr("ng-if")=="source.type == 10"){$(this).click();clickflag=true;return false}else{if(icot.attr("ng-if")=="source.type == 80"){if(window.Notification&&Notification.permission!=="denied"&&runff){au.play();Notification.requestPermission(function(status){var n=new Notification("那个~主人~",{body:"视频都放完了喵！该做测验了喵！",icon:"./nof.png"})})}clickflag=true;return false}}}});if(!clickflag){nowscope=nowscope.parent().next();$($(nowscope[0]).children(".basic")[0]).click();return false}return true}function gotonextcoursen(){if(!gotonextcourse()){setTimeout("gotonextcoursen()",2000)}};
app.controller("mainCtrl",["chapterList","lastLearn","loadParams","$scope","$rootScope","uoocService","courseService","$stateParams","$state","$filter","videoService",function(e,t,r,n,a,o,i,c,s,u,d){var p=n.$stateParams,l=null;window.courseId=p.courseId,a.stateParams=n.$stateParams,a.packageTitile=t.parent_name,a.chapterList=e,a.lastLearn=t,a.loadParams=r,a.professionId=t.profession_id,n.questionList=[],a.coursePrice=t.course_price,a.isPayCourse=1==t.course_pay,a.hasPay=1==t.pay_status,n.preview=location.search.search("show=preview")>-1?1:0,n.sourceType={10:"视频",50:"附件",60:"文本",70:"讨论",80:"测验"},n.panleType=0,n.changePanle=function(e){n.panleType=e,2==e&&n.getQuestionList()},n.toggleChapter=function(e){e.hide=!e.hide,e.hide&&n.clearVisible(e)},n.clearVisible=function(e){e&&e.children&&e.children.length>0&&_.forEach(e.children,function(e){e.hide=!0,n.clearVisible(e)})},n.setViewSource=function(e,t){e.preview=n.preview,a.lastSource=a.curSource||{};var r=e;"empty"==e?r={id:"empty",type:0,title:t}:"pay"==e&&(r={id:"pay",type:"pay",price:a.coursePrice}),a.curSource=r},n.setFinishedSource=function(e){i.getCatalogLearn({cid:p.courseId,chapter_id:p.chapterId||0,section_id:p.sectionId||0,subsection_id:p.pointId||0}).then(function(t){var r=t.data;e.finished=1,a.curChapterItem.finished=r.chapter_finished||0,a.curSectionItem.finished=r.section_finished||0;var n=s.current.name;n.search("main.chapter.section.point")>-1&&(a.curSubsectionItem.finished=r.subsection_finished||0)})},n.goSource=function(e,t){50==e.type?(p.pointId="section"==t?0:p.pointId,p.sourceId=0,s.go("main.chapter.section.point.files",p)):"section"==t?(p.sourceId=e.id,s.go("main.chapter.section.source",{sourceId:e.id})):(p.sourceId=e.id,s.go("main.chapter.section.point.source",{sourceId:e.id}))},n.$on("$stateChangeSuccess",function(t,r,o){n.toState=r.name;var i=[],c=null;if("main.chapter.section.source"==n.toState)i=a.curSectionItem.unitSource;else if("main.chapter.section.point.source"==n.toState)i=a.curSubsectionItem.unitSource;else{if("main.chapter.section.point.files"==n.toState){for(var s=n.curSubsectionItem.id?n.curSubsectionItem.unitSource:n.curSectionItem.unitSource,u={},d=0;d<s.length;d++)if(50==s[d].type){u=s[d];break}return n.goSource(u),n.setViewSource(u),!1}"main.chapter"==n.toState&&(a.activeChapter=a.curChapterItem),a.activeChapter=a.activeChapter||e[0];var l=a.isPayCourse&&!a.hasPay&&1==a.activeChapter.is_pay&&a.coursePrice>0;if(l)n.setViewSource("pay");else{var f=a.activeChapter.name?"进入"+a.activeChapter.name+",请选择课程资源":"请选择课程资源";n.setViewSource("empty",f)}}if(o.sourceId&&i)for(var h=0;h<i.length;h++)if(i[h].id==o.sourceId){c=i[h],n.setViewSource(c);break}"main.chapter"!=n.toState&&"main.chapter.section"!=n.toState&&"main.chapter.section.point"!=n.toState||setTimeout(function(){var e=p.pointId||p.sectionId||p.chapterId,t=$("#catologOuter"),r=$("#"+e);return!(!r.length&&a.activeChapter.hide)&&void $("#catologOuter").animate({scrollTop:r.offset().top-t.offset().top+t.scrollTop()},300)})}),n.$on("$stateChangeStart",function(e,t,r){l&&l.dispose()}),a.cleanVProgressInterval=function(){a.interval&&clearInterval(a.interval)},n.$on("changeSource",function(e,t){a.cleanVProgressInterval(),t.preview=n.preview,a.curSource=t}),n.$on("changeUnitLearn",function(e,t){a.sourceList=t,n.sourceList=t}),n.frameArea={},n.setFrameSize=function(){var e=angular.element(window),t=angular.element(".learn-head"),r=angular.element(".learn-main-right");angular.element(".learn-main-left");n.frameArea.width=e.width()-r.width()+"px",n.frameArea.height=e.height()-t.height()+"px"},n.setFrameSize(),angular.element(window).resize(function(){n.setFrameSize(),n.$broadcast("resize",n.frameArea),n.$apply()}),n.noteContent="",n.discuzContent="",n.cleanNote=function(){var e=window.DIR_EDITORS.noteEditor;e.setContent("")},n.addDiscuz=function(){var e=n.$stateParams,t=angular.element("#discuzSubject"),r=t.val();if(!n.discuzContent||!r)return void layer.msg("讨论标题及内容不能为空");if("undefined"!=typeof e.chapterId)var a=e.chapterId;if("undefined"!=typeof e.sectionId)var a=e.sectionId;if("undefined"!=typeof e.pointId)var a=e.pointId;i.discAddQuestion({cid:p.courseId,type:10,catalog_id:a||0,content:n.discuzContent,subject:r}).then(function(){layer.msg("发布成功, 请到讨论区学生提问查看"),n.cleanQues()})},n.cleanQues=function(){var e=angular.element("#discuzSubject");e.val("");var t=window.DIR_EDITORS.quesEditor;t.setContent("")},n.questionPaper={page:1,pagesize:3},n.getQuestionList=function(e){var t=n.$stateParams;e&&(n.questionPaper.page=e);var r={cid:p.courseId,type:"10",chapter_id:t.chapterId||0,section_id:t.sectionId||0};angular.extend(r,n.questionPaper),i.discGetQuestion(r,function(e){var t=e.data;"undefined"!=typeof t.data[0]?n.questionList=t.data[0].chapter||[]:n.questionList=[],n.questionPaper.pages=t.page.pages,n.questionPaper.total=t.page.total,n.questionPaper.startPage=t.page.start})},n.$on("noteContent",function(e,t){n.noteContent=t}),n.$on("discuzContent",function(e,t){n.discuzContent=t}),n.addNote=function(){var e=n.$stateParams;return n.noteContent?void i.addNote({cid:p.courseId,chapter_id:e.chapterId,section_id:e.sectionId,subsection_id:1*e.pointId>0?e.pointId:0,content:n.noteContent}).then(function(e){layer.msg("添加成功, 请点击我的笔记查看"),n.cleanNote()}):void layer.msg("笔记内容不能为空")},window.testFinished=function(e){n.setFinishedSource(a.curSource)};var f=0;n.LearnMark=function(e,r,a,o,c){var s=r||0;return i.LearnMark({hidemsg_:!0,cid:c.courseId,chapter_id:c.chapterId,section_id:c.sectionId,subsection_id:c.pointId||0,video_pos:e.toFixed(2),video_length:s.toFixed(2),network:a?a.substr(3):0,source:1,resource_id:c.sourceId,load:!1})["catch"](function(e){var r=1==n.curSource.finished,a=1==t.can_drag_video||r;a||e.code==-1&&(d.addTip(o,"提示视频进度不能拖拽"),o.currentTime(e.data.video_pos))})},n.updateCurLearnMark=function(e,t,r){/*mod-start*/if(sId!=n.curSource.id){e.volume(sVolume);e.playbackRate(sPalybackRate);sId=n.curSource.id}if(sVolume!=e.volume())sVolume=e.volume();if(sPalybackRate!=e.playbackRate())sPalybackRate=e.playbackRate();if((e.duration()-e.currentTime()<5)&&(e.currentTime()>1)){if(runff){runff=false;setTimeout(function(){gotonextcoursen();runff=true},2000)}};/*mod-end*/if(e.error_||a.isview||n.curSource.finished)return void n.cleanVProgressInterval();var o=r?e.duration():e.currentTime(),i=t||p;f=o>f?o:f,n.LearnMark(o,e.duration(),e.cdn,e,i).then(function(e){var t=i.sourceId,r={};t==a.lastSource.id?r=a.lastSource:t==a.curSource.id&&(r=a.curSource),r.id&&e.data&&1==e.data.finished&&n.setFinishedSource(r)})},a.interval,n.vProgressInterval=function(e){n.cleanVProgressInterval();var t=n.playerIsPaused(e);if(!t)return a.interval=setInterval(function(){n.updateCurLearnMark(e)},6e4),f},n.playerIsPaused=function(e){var t=$(e.controlBar.playToggle.el_);return t.hasClass("vjs-paused")},n.sureAnswer=function(){if(!n.curQsource.canswer)return void(n.wrongTip="请选择正确答案");var e;if(10==n.curQsource.type||20==n.curQsource.type)e=u("answerChecked")(n.curQsource.canswer,n.curQsource.answer);else if(11==n.curQsource.type){var t=JSON.parse(n.curQsource.answer).length,r=0;for(var a in n.curQsource.canswer)if(n.curQsource.canswer[a]){if(!u("answerChecked")(a,n.curQsource.answer))break;r++}e=t==r}e?(n.curQsource.answered=e,0==wrongCount?d.addTip(l,"学习十分认真! Perfect!"):1==wrongCount?d.addTip(l,"答错"+wrongCount+"次, 继续加油!"):wrongCount>1&&d.addTip(l,"答错了"+wrongCount+"次, 上课需要认真点!"),n.wrongTip="",wrongCount=0,layer.closeAll(),l.play()):(wrongCount++,n.wrongTip="正确答案: "+n.curQsource.answer)},n.$on("playerInit",function(e,r){l=r,l.stateParams=angular.extend({},p),f=n.curSource.video_pos,wrongCount=0;for(var o=n.curSource.quiz||[],i={points:[],list:{}},c=0;c<o.length;c++){var s=o[c],u=s.set_time;i.points.push(u),i.list[u]=s}var h=(a.isPayCourse&&!a.hasPay&&1==a.activeChapter.is_pay,f||0),v=1==n.curSource.finished,g=1==t.can_drag_video||v;l.preventDrag=!g,l.on("play",function(){var e=l.duration();d.addProgressPoints(l,i.points,e,function(e,t){n.curQsource=i.list[t],n.$apply(),setTimeout(function(){layer.closeAll(),e.pause(),layer.open({type:1,title:"小测",fixed:!0,move:!1,area:["600px",""],zIndex:2147483647,scrollbar:!1,closeBtn:!1,content:angular.element("#quizLayer"),end:function(){d.toggleMask(e,"remove")}}),d.toggleMask(e)},300)})}),l.on("timeupdate",function(){var e=l.currentTime();h=e>h?e:h,n.curSource.video_pos=h,n.$apply()});var m=l.controlBar.progressControl.seekBar;l.controlBar.progressControl.seekBar.on(["mousedown","mouseup"],function(e){if("mousedown"==e.type&&n.cleanVProgressInterval(),!g){var t=m.calculateDistance(e)*l.duration();t>h?(l.preventDrag=!0,d.addTip(l,"请认真观看完当前课程")):l.currentTime(t>h?h:t)}}),l.on("pause",function(){n.cleanVProgressInterval()}),l.on(["play","seeked"],function(e){n.updateCurLearnMark(l)}),l.on(["ended"],function(e){n.updateCurLearnMark(l,null,"ended")}),l.on(["play","cdnChange","mouseup"],function(e){var t=n.playerIsPaused(l);t||n.vProgressInterval(l)}),l.on("dispose",function(){a.cleanVProgressInterval(),n.updateCurLearnMark(l,l.stateParams),l=null,r.destroyed=!0})})}]),angular.element(document).ready(function(){angular.bootstrap(document.body,["app"],{strictDi:!0})});