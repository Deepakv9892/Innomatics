function choosePlan(planType, wantsTrainer, wantsDietPlan) {
    if (planType === "basic") {
      return "Basic plan: $20/month - Only gym access";
    } else if (planType === "premium") {
      if (wantsTrainer) {
        return "Premium plan: $50/month - Gym + Personal Trainer";
      } else {
        return "Premium plan: $50/month - Gym only, no trainer";
      }
    } else if (planType === "vip") {
      if (wantsTrainer && wantsDietPlan) {
        return "VIP plan: $80/month - Gym + Trainer + Diet Plan";
      } else if (wantsTrainer) {
        return "VIP plan: $80/month - Gym + Trainer";
      } else if (wantsDietPlan) {
        return "VIP plan: $80/month - Gym + Diet Plan";
      } else {
        return "VIP plan: $80/month - Gym only, no trainer or diet plan";
      }
    } else {
      return "Please select a valid plan.";
    }
  }
  
  document.getElementById("membership-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    let planType = document.getElementById("planType").value;
    let wantsTrainer = document.getElementById("wantsTrainer").checked;
    let wantsDietPlan = document.getElementById("wantsDietPlan").checked;
  
    let result = choosePlan(planType, wantsTrainer, wantsDietPlan);
    document.getElementById("result").innerText = result;
  });
  