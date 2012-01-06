$(document).ready(function(){
	$('.sked-day-container').selectable({
		stop:onDaysSelected,
		selected:onDaySelected,
	});
	
	$('.band-project-selector').live('change blur', onProjectSelected);
	
	$('.trigger-add-person').live('click', onPersonAdd);
	
	$('.trigger-add-person-to-project').live('click', onPersonAddProject);
	
	$('.trigger-add-project').bind('click', launchNewProjectModal);
	
	$('.trigger-create-project').live('click', onProjectAdd);
	
	$.modal.defaults.opacity = 100;

});

function onProjectAdd(e){
	e.preventDefault();
	var modal = $(this).closest('.modal-new-project');
	var title = modal.find('.new-project-name').val();
	var budget = modal.find('.new-project-budget-time').val();
	var project = $('.project-group.blank').clone();
	project.removeClass('blank');
	$('.project-group').last().after(project);
	project.addClass('highlight-blue');
	$.modal.close();
	project.find('.project-name').text(title);
	project.find('.num-budgeted').text(budget);
	project.find('.project-name').addClass('text-blue');
	
}

function onPersonAdd(e){
	e.preventDefault();
	var row = $('.person-row.blank').clone();
	row.removeClass('blank');
	$('.person-row').last().after(row);
	row.find('.sked-day-container').selectable({
		stop:onDaysSelected,
		selected:onDaySelected,
	});
}	

function onPersonAddProject(e){
	e.preventDefault();
	var row = $('.person-row.blank').clone();
	row.removeClass('blank');
	$(this).closest('.project-group').find('.person-row').last().after(row);
	row.find('.sked-day-container').selectable({
		stop:onDaysSelected,
		selected:onDaySelected,
	});
}

function launchNewProjectModal(e){
	$('.modal-new-project').modal();
}

function onProjectSelected(e){
	var opt = $(this).find('option:selected');
	if (opt.hasClass('trigger-new-project')){
		launchNewProject(null);
		return;
	}
	
	var color = opt.data('color');
	var band = opt.closest('.sked-band');
	band.attr('class', '');
	band.addClass(color);
	band.addClass('sked-band');	
	if (opt.hasClass('trigger-unavailable')){
		band.addClass('sked-band-unavailable');
	}
	band.find('.project-name').text(opt.text());
	$(this).hide();
	band.find('.project-name').show();
}

function onDaysSelected(event, ui){
	var selected = $(this).find('.ui-selected');
	var group = $('<div class="selected-group"></div>')
	selected.wrapAll(group);;
	var band = $('.sked-band.blank').clone();
	band.removeClass('blank');
	var w = selected.width() * selected.length;
	band.width(w);
	group = $('.selected-group');
	group.after(band);
	group.remove();
	var task = $(this).find('.sked-band-task');
	band.bind('mouseout', onBandOut);
	band.bind('mouseover', onBandOver);
	band.find('.project-name').hide();
	task.data('placeholder', task.attr('placeholder'));
	$('.sked-day-container').sortable();
	//$(".sked-day-container" ).selectable("option", "disabled", true);
	var skedCont = $(this).closest(".sked-day-container");
	band.mousedown(function(){
		skedCont.selectable("destroy");
		skedCont.sortable();
	});
	band.mouseover(function(){
		task.attr('placeholder', task.data('placeholder'));
	});
	band.mouseout(function(){
		task.attr('placeholder', '');
	});
	band.mouseup(function(){
		skedCont.selectable({
			stop:onDaysSelected,
			selected:onDaySelected
		});
		skedCont.sortable('destroy');
	});
	$('.sked-day-container').sortable();
}

function onBandOut(e){
	
}

function onBandOver(e){
	
}

function onDaySelected(event, ui){
	
}

function trace(m){
	try {
		console.log(m);
	} catch(e){}
}