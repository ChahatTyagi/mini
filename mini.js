// BMI Chart functionality will be added here

// BMI Chart Button and Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // BMI Modal Elements
    const bmiModal = document.getElementById('bmi-modal');
    const bmiChartBtn = document.getElementById('bmi-chart-btn');
    
    // Diet Plan Modal Elements
    const dietModal = document.getElementById('diet-modal');
    const dietPlanBtn = document.getElementById('diet-plan-btn');
    const dietTabBtns = document.querySelectorAll('.diet-tab-btn');
    const dietTabContents = document.querySelectorAll('.diet-tab-content');
    
    // Toggle switches for vegetarian options
    const gainVegToggle = document.getElementById('gain-veg-toggle');
    const maintainVegToggle = document.getElementById('maintain-veg-toggle');
    const lossVegToggle = document.getElementById('loss-veg-toggle');
    
    // Load more buttons
    const loadMoreBtns = document.querySelectorAll('.load-more-btn');
    
    // General modal elements
    const closeBtns = document.querySelectorAll('.close');
    
    // Open BMI modal when the button is clicked
    if (bmiChartBtn) {
        bmiChartBtn.addEventListener('click', function() {
            bmiModal.style.display = 'block';
        });
    }
    
    // Open Diet Plan modal when the button is clicked
    if (dietPlanBtn) {
        dietPlanBtn.addEventListener('click', function() {
            dietModal.style.display = 'block';
        });
    }
    
    // Close modals when X is clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bmiModal) {
            bmiModal.style.display = 'none';
        }
        if (event.target === dietModal) {
            dietModal.style.display = 'none';
        }
    });
    
    // Diet Plan Tab Switching
    dietTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            dietTabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab to show
            const tabToShow = this.getAttribute('data-diet-tab');
            
            // Hide all tab contents
            dietTabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            document.getElementById(tabToShow + '-tab').classList.add('active');
        });
    });
    
    // Vegetarian Toggle Functionality
    if (gainVegToggle) {
        gainVegToggle.addEventListener('change', function() {
            toggleVegetarianPlan('gain', this.checked);
        });
    }
    
    if (maintainVegToggle) {
        maintainVegToggle.addEventListener('change', function() {
            toggleVegetarianPlan('maintain', this.checked);
        });
    }
    
    if (lossVegToggle) {
        lossVegToggle.addEventListener('change', function() {
            toggleVegetarianPlan('loss', this.checked);
        });
    }
    
    function toggleVegetarianPlan(planType, isVegetarian) {
        const nonVegElements = document.querySelectorAll(`#${planType}-tab .non-vegetarian`);
        const vegElements = document.querySelectorAll(`#${planType}-tab .vegetarian`);
        
        if (isVegetarian) {
            nonVegElements.forEach(el => el.classList.add('hidden'));
            vegElements.forEach(el => el.classList.remove('hidden'));
        } else {
            nonVegElements.forEach(el => el.classList.remove('hidden'));
            vegElements.forEach(el => el.classList.add('hidden'));
        }
    }
    
    // Load More Days Functionality
    loadMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const planType = this.getAttribute('data-plan');
            loadMoreMealDays(planType);
        });
    });
    
    // Load additional meal days (day 2, 3, 4)
    function loadMoreMealDays(planType) {
        const mealDaysContainer = document.querySelector(`#${planType}-tab .meal-days`);
        const loadMoreBtn = document.querySelector(`#${planType}-tab .load-more-btn`);
        const isVegetarian = document.getElementById(`${planType}-veg-toggle`).checked;
        
        // Check if days 2-4 are already loaded
        if (document.getElementById(`${planType}-day2-non-veg`)) {
            loadMoreBtn.textContent = 'All days loaded';
            loadMoreBtn.disabled = true;
            return;
        }
        
        // Create days 2-4
        for (let day = 2; day <= 4; day++) {
            const dayElement = createMealDay(planType, day, isVegetarian);
            mealDaysContainer.appendChild(dayElement);
        }
        
        // Update button state
        loadMoreBtn.textContent = 'All days loaded';
        loadMoreBtn.disabled = true;
    }
    
    // Create a meal day element (simplified for example)
    function createMealDay(planType, dayNum, isVegetarian) {
        const mealDay = document.createElement('div');
        mealDay.className = 'meal-day';
        
        const dayTitle = document.createElement('h4');
        dayTitle.textContent = `Day ${dayNum}`;
        mealDay.appendChild(dayTitle);
        
        // Non-vegetarian meal plan
        const nonVegPlan = document.createElement('div');
        nonVegPlan.className = `meal-plan non-vegetarian ${isVegetarian ? 'hidden' : ''}`;
        nonVegPlan.id = `${planType}-day${dayNum}-non-veg`;
        
        // Vegetarian meal plan
        const vegPlan = document.createElement('div');
        vegPlan.className = `meal-plan vegetarian ${isVegetarian ? '' : 'hidden'}`;
        vegPlan.id = `${planType}-day${dayNum}-veg`;
        
        // Add sample meal content based on plan type and day
        nonVegPlan.innerHTML = getMealPlanContent(planType, dayNum, false);
        vegPlan.innerHTML = getMealPlanContent(planType, dayNum, true);
        
        mealDay.appendChild(nonVegPlan);
        mealDay.appendChild(vegPlan);
        
        return mealDay;
    }
    
    // Get meal plan content based on plan type, day, and vegetarian preference
    function getMealPlanContent(planType, dayNum, isVegetarian) {
        // This function would ideally contain all meal plans for different days
        // For simplicity, we'll return a template with some variations
        
        const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
        let content = '';
        
        mealTypes.forEach(mealType => {
            content += `
                <div class="meal">
                    <h5>${mealType}</h5>
                    <ul>
                        ${getMealItems(planType, dayNum, mealType, isVegetarian).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        
        return content;
    }
    
    // Get meal items based on plan type, day, meal type, and vegetarian preference
    function getMealItems(planType, dayNum, mealType, isVegetarian) {
        // This would ideally be a database of meal plans
        // For simplicity, we'll return some example meals
        
        const mealPlans = {
            gain: {
                vegetarian: {
                    2: {
                        Breakfast: ['Protein smoothie with banana, peanut butter, oats', 'Whole grain toast with avocado', 'Plant-based yogurt with nuts and seeds'],
                        Lunch: ['Quinoa bowl with chickpeas and vegetables', 'Hummus with whole grain pita', 'Mixed fruit salad'],
                        Snack: ['Protein bar', 'Mixed nuts (50g)', 'Soy milk'],
                        Dinner: ['Bean and vegetable curry', 'Brown rice (1 cup)', 'Side salad with olive oil dressing', 'Coconut yogurt dessert']
                    },
                    3: {
                        Breakfast: ['Tofu scramble with vegetables', 'Whole grain bagel with nut butter', 'Fresh orange juice'],
                        Lunch: ['Lentil soup', 'Vegetable stir-fry with tempeh', 'Quinoa (1 cup)'],
                        Snack: ['Trail mix with dried fruits', 'Protein shake', 'Banana'],
                        Dinner: ['Vegan pasta with plant-based protein', 'Garlic bread', 'Steamed vegetables', 'Fruit sorbet']
                    },
                    4: {
                        Breakfast: ['Overnight oats with nuts and fruits', 'Plant-based protein shake', 'Whole grain toast with avocado'],
                        Lunch: ['Falafel wrap with tahini', 'Sweet potato fries', 'Greek salad (no feta)'],
                        Snack: ['Energy balls (3-4)', 'Fruit smoothie', 'Mixed nuts'],
                        Dinner: ['Stuffed bell peppers with quinoa and beans', 'Side salad', 'Coconut rice pudding']
                    }
                },
                nonVegetarian: {
                    2: {
                        Breakfast: ['4 egg omelette with cheese and vegetables', 'Whole grain toast with butter', 'Greek yogurt with honey'],
                        Lunch: ['Tuna sandwich on whole grain bread', 'Side salad with olive oil', 'Whole milk'],
                        Snack: ['Protein shake', 'Banana with peanut butter', 'Trail mix'],
                        Dinner: ['Beef stir-fry with vegetables', 'Brown rice (1 cup)', 'Avocado salad']
                    },
                    3: {
                        Breakfast: ['Protein pancakes with maple syrup', 'Bacon (3 slices)', 'Whole milk'],
                        Lunch: ['Chicken wrap with avocado', 'Sweet potato fries', 'Fruit smoothie'],
                        Snack: ['Hard-boiled eggs (2)', 'Cheese stick', 'Apple with peanut butter'],
                        Dinner: ['Steak (200g)', 'Baked potato with sour cream', 'Steamed vegetables']
                    },
                    4: {
                        Breakfast: ['French toast with maple syrup', 'Scrambled eggs with cheese', 'Orange juice'],
                        Lunch: ['Turkey and cheese sandwich', 'Potato salad', 'Greek yogurt'],
                        Snack: ['Protein bar', 'Mixed nuts', 'Chocolate milk'],
                        Dinner: ['Grilled salmon', 'Quinoa pilaf', 'Roasted vegetables', 'Ice cream']
                    }
                }
            },
            maintain: {
                vegetarian: {
                    2: {
                        Breakfast: ['Overnight oats with berries', 'Plant-based yogurt', 'Green tea'],
                        Lunch: ['Mediterranean salad with chickpeas', 'Whole grain pita', 'Hummus'],
                        Snack: ['Apple with almond butter', 'Handful of nuts'],
                        Dinner: ['Vegetable stir-fry with tofu', 'Brown rice (1/2 cup)', 'Steamed broccoli']
                    },
                    3: {
                        Breakfast: ['Smoothie with plant-based protein', 'Whole grain toast with avocado', 'Green tea'],
                        Lunch: ['Lentil soup', 'Mixed green salad', 'Whole grain crackers'],
                        Snack: ['Carrot sticks with hummus', 'Small handful of almonds'],
                        Dinner: ['Bean and vegetable chili', 'Small side salad', 'Baked sweet potato']
                    },
                    4: {
                        Breakfast: ['Tofu scramble with vegetables', 'Whole grain toast', 'Fresh fruit'],
                        Lunch: ['Quinoa bowl with roasted vegetables', 'Tahini dressing', 'Orange'],
                        Snack: ['Greek yogurt with berries', 'Herbal tea'],
                        Dinner: ['Vegetable curry', 'Brown rice (1/2 cup)', 'Steamed vegetables']
                    }
                },
                nonVegetarian: {
                    2: {
                        Breakfast: ['Greek yogurt with berries and honey', 'Whole grain toast', 'Green tea'],
                        Lunch: ['Tuna salad with mixed greens', 'Whole grain crackers', 'Apple'],
                        Snack: ['Protein shake', 'Small handful of almonds'],
                        Dinner: ['Grilled chicken (120g)', 'Quinoa (1/2 cup)', 'Roasted vegetables']
                    },
                    3: {
                        Breakfast: ['Omelette with vegetables', 'Whole grain toast', 'Fresh fruit'],
                        Lunch: ['Turkey and avocado wrap', 'Side salad', 'Orange'],
                        Snack: ['Greek yogurt', 'Small handful of walnuts'],
                        Dinner: ['Baked salmon (120g)', 'Sweet potato (small)', 'Steamed broccoli']
                    },
                    4: {
                        Breakfast: ['Scrambled eggs with spinach', 'Whole grain toast', 'Green tea'],
                        Lunch: ['Chicken salad with mixed greens', 'Whole grain roll', 'Apple'],
                        Snack: ['Protein bar', 'Pear'],
                        Dinner: ['Lean beef stir-fry', 'Brown rice (1/2 cup)', 'Mixed vegetables']
                    }
                }
            },
            loss: {
                vegetarian: {
                    2: {
                        Breakfast: ['Smoothie with plant protein and spinach', 'Green tea'],
                        Lunch: ['Large salad with chickpeas', 'Balsamic vinegar dressing', 'Apple'],
                        Snack: ['Celery sticks with 1 tbsp almond butter'],
                        Dinner: ['Vegetable soup', 'Small side salad', 'Herbal tea']
                    },
                    3: {
                        Breakfast: ['Tofu scramble with vegetables', '1/2 grapefruit', 'Green tea'],
                        Lunch: ['Lentil soup', 'Side salad with lemon juice', 'Tangerine'],
                        Snack: ['Plant-based protein shake with water', 'Cucumber slices'],
                        Dinner: ['Zucchini noodles with tomato sauce', 'Herbal tea']
                    },
                    4: {
                        Breakfast: ['1/2 cup oatmeal with berries', 'Green tea'],
                        Lunch: ['Buddha bowl with quinoa and vegetables', 'Lemon tahini dressing', 'Orange'],
                        Snack: ['Rice cake with 1 tbsp hummus'],
                        Dinner: ['Cauliflower rice stir-fry with tofu', 'Steamed vegetables', 'Herbal tea']
                    }
                },
                nonVegetarian: {
                    2: {
                        Breakfast: ['Protein smoothie with spinach', 'Green tea'],
                        Lunch: ['Grilled chicken salad', 'Lemon juice dressing', 'Apple'],
                        Snack: ['Celery sticks with 1 tbsp peanut butter'],
                        Dinner: ['Baked cod (100g)', 'Steamed asparagus', 'Herbal tea']
                    },
                    3: {
                        Breakfast: ['Egg white omelette with vegetables', '1/2 grapefruit', 'Green tea'],
                        Lunch: ['Turkey and vegetable soup', 'Side salad with lemon juice', 'Tangerine'],
                        Snack: ['Protein shake with water', 'Cucumber slices'],
                        Dinner: ['Grilled shrimp (100g)', 'Zucchini noodles', 'Herbal tea']
                    },
                    4: {
                        Breakfast: ['1/2 cup oatmeal with berries', 'Green tea'],
                        Lunch: ['Tuna salad in lettuce wraps', 'Carrot and celery sticks', 'Orange'],
                        Snack: ['Rice cake with 1 tbsp cottage cheese'],
                        Dinner: ['Baked chicken breast (100g)', 'Steamed vegetables', 'Herbal tea']
                    }
                }
            }
        };
        
        const dietType = isVegetarian ? 'vegetarian' : 'nonVegetarian';
        
        // Return default meal items if specific plan not found
        if (!mealPlans[planType] || !mealPlans[planType][dietType] || !mealPlans[planType][dietType][dayNum] || !mealPlans[planType][dietType][dayNum][mealType]) {
            return ['Meal item 1', 'Meal item 2', 'Meal item 3'];
        }
        
        return mealPlans[planType][dietType][dayNum][mealType];
    }
    
    // BMI Calculator elements and functionality
    const calcHeightInput = document.getElementById('calc-height');
    const calcWeightInput = document.getElementById('calc-weight');
    const calcAgeInput = document.getElementById('calc-age');
    const calcBmiBtn = document.getElementById('calc-bmi-btn');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiRecommendation = document.getElementById('bmi-recommendation');
    
    // Calculate BMI when button is clicked
    if (calcBmiBtn) {
        calcBmiBtn.addEventListener('click', calculateBMI);
    }
    
    function calculateBMI() {
        const height = parseFloat(calcHeightInput.value); // in feet
        const weight = parseFloat(calcWeightInput.value); // in kg
        const age = parseInt(calcAgeInput.value);
        
        if (!height || !weight || !age) {
            alert('Please fill all fields with valid numbers');
            return;
        }
        
        // Convert height from feet to meters
        const heightInMeters = height * 0.3048;
        
        // Calculate BMI: weight (kg) / (height (m))^2
        const bmi = weight / (heightInMeters * heightInMeters);
        const roundedBmi = bmi.toFixed(1);
        
        // Display BMI value
        bmiValue.textContent = roundedBmi;
        
        // Determine BMI category and recommendation
        updateBmiResults(bmi, age);
    }
    
    function updateBmiResults(bmi, age) {
        let category, recommendation;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            recommendation = 'Consider gaining some weight through a healthy diet rich in proteins and calories.';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            recommendation = 'Maintain your current weight with a balanced diet and regular exercise.';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            recommendation = 'Consider losing some weight through a balanced diet and increased physical activity.';
        } else {
            category = 'Obese';
            recommendation = 'It is recommended to consult with a healthcare professional about a weight loss plan.';
        }
        
        // Age-specific adjustments to recommendation
        if (age < 20) {
            recommendation += ' As you are under 20, your BMI should be evaluated against age-specific percentiles.';
        } else if (age > 65) {
            recommendation += ' For adults over 65, a slightly higher BMI (25-27) may be beneficial.';
        }
        
        // Display category and recommendation
        bmiCategory.textContent = category;
        bmiRecommendation.textContent = recommendation;
    }
});
