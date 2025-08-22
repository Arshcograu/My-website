let plans = [];

function addPlan() {
    let subject = document.getElementById('subject').value;
    let chapter = document.getElementById('chapter').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;

    if(subject && chapter && date && time){
        let plan = {subject, chapter, date, time};
        plans.push(plan);

        let card = document.createElement('div');
        card.className = 'study-card';
        card.innerHTML = `<strong>${subject}</strong><br>${chapter}<br>${date} | ${time}`;
        document.getElementById('studyList').appendChild(card);

        setTimeout(()=> { card.classList.add('show'); }, 100);

        card.ondblclick = () => downloadPlans();

        document.getElementById('subject').value = '';
        document.getElementById('chapter').value = '';
        document.getElementById('date').value = '';
        document.getElementById('time').value = '';
    } else {
        alert('সব ফিল্ড পূরণ করো!');
    }
}

function downloadPlans() {
    if(plans.length === 0){
        alert('কোনো plan নেই!');
        return;
    }
    let csvContent = "data:text/csv;charset=utf-8,Subject,Chapter,Date,Time\n";
    plans.forEach(p => {
        csvContent += `${p.subject},${p.chapter},${p.date},${p.time}\n`;
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "study_planner.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}