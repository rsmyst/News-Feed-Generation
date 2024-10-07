# # # from keybert import KeyBERT

# # # doc = """
# # #          Supervised learning is the machine learning task of learning a function that
# # #          maps an input to an output based on example input-output pairs. It infers a
# # #          function from labeled training data consisting of a set of training examples.
# # #          In supervised learning, each example is a pair consisting of an input object
# # #          (typically a vector) and a desired output value (also called the supervisory signal).
# # #          A supervised learning algorithm analyzes the training data and produces an inferred function,
# # #          which can be used for mapping new examples. An optimal scenario will allow for the
# # #          algorithm to correctly determine the class labels for unseen instances. This requires
# # #          the learning algorithm to generalize from the training data to unseen situations in a
# # #          'reasonable' way (see inductive bias).
# # #       """
# # # kw_model = KeyBERT()
# # # keywords = kw_model.extract_keywords(query)
# # # print(keywords)
# # # \\\\\\\\\\\\\\\\\\
# # # import sys
# # # import json
# # # from keybert import KeyBERT

# # # def get_keywords(description):
# # #     kw_model = KeyBERT()
# # #     keywords = kw_model.extract_keywords(description)
# # #     return keywords

# # # if __name__ == "__main__":
# # #     if len(sys.argv) > 1:
# # #         description = sys.argv[1]
# # #         print(f"Received description: {description}", file=sys.stderr)
# # #         keywords = get_keywords(description)
# # #         print(json.dumps(keywords))
# # #     else:
# # #         print("No description provided", file=sys.stderr)
# # #         print(json.dumps([]))  # Return an empty list if no description is provided

# # # ||||||||||||||
# # # doc = sys.argv[1]

# # # kw_model = KeyBERT()
# # # keywords = kw_model.extract_keywords(doc)
# # # print(json.dumps(keywords))
# # # # print(keywords)
# # import sys
# # import json
# # from keybert import KeyBERT

# # def get_keywords(description):
# #     try:
# #         if not description or len(description.strip()) == 0:
# #             print(json.dumps([["No text provided", 1.0]]))
# #             return

# #         print(f"Processing description: {description[:100]}...", file=sys.stderr)
        
# #         kw_model = KeyBERT()
# #         keywords = kw_model.extract_keywords(description)
        
# #         # Ensure we have at least some output
# #         if not keywords:
# #             keywords = [["No keywords found", 1.0]]
        
# #         # Output the result to stdout
# #         print(json.dumps(keywords))
        
# #     except Exception as e:
# #         print(f"Error processing keywords: {str(e)}", file=sys.stderr)
# #         # Still provide a valid JSON output
# #         print(json.dumps([["Error processing text", 1.0]]))

# # if __name__ == "__main__":
# #     if len(sys.argv) > 1:
# #         description = sys.argv[1]
# #         get_keywords(description)
# #     else:
# #         print(json.dumps([["No input provided", 1.0]]))

# import sys
# import json
# from keybert import KeyBERT

# # Read the document string from the command-line arguments
# doc = sys.argv[1]

# # doc = "In celebration of Diwali, Apple is offering free limited-edition Beats Solo Buds to customers who purchase a new iPhone 15 or iPhone 15 Plus in India.The special Beats Solo Buds and their carrying case come in an orange color that has never been availab…."
# kw_model = KeyBERT()
# keywords = kw_model.extract_keywords(doc)
# # print(keywords)
# print(json.dumps(keywords))
# |||||||||||||||




# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from rake_nltk import Rake
# import nltk
# nltk.download('punkt')
# app = Flask(__name__)
# CORS(app)

# @app.route('/extract-keywords', methods=['POST'])
# def extract_keywords():
#     data = request.json
#     description = data.get('description', '')
    
#     # Initialize RAKE
#     r = Rake()
    
#     # Extract keywords
#     r.extract_keywords_from_text(description)
    
#     # Get the top 5 keywords
#     keywords = r.get_ranked_phrases()[:5]
    
#     print("Extracted keywords:", keywords)  # Log to console
    
#     return jsonify({
#         'keywords': keywords
#     })

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS

# # app = Flask(__name__)
# # CORS(app)

# # @app.route('/extract-keywords', methods=['POST'])
# # def extract_keywords():
# #     data = request.json
# #     description = data.get('description', '')
    
# #     # For now, just return some dummy keywords
# #     dummy_keywords = ["news", "article", "headline", "story", "report"]
    
# #     print("Received description:", description)
# #     print("Returning dummy keywords:", dummy_keywords)
    
# #     return jsonify({
# #         'keywords': dummy_keywords
# #     })

# # if __name__ == '__main__':
# #     app.run(port=3050, debug=True)
import sys
import json
from keybert import KeyBERT

# Initialize KeyBERT
kw_model = KeyBERT()

# Read the JSON string passed from the Node.js backend
input_data = json.loads(sys.argv[1])

# Extract the text from the input JSON
text = input_data['text']
# text = "Artificial intelligence is the name of the game!"

# Extract keywords using KeyBERT
keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 2), stop_words='english')

# Prepare the output as JSON
output_data = {
    'keywords': keywords
}

# Print the result (Node.js will capture this output)
print(json.dumps(output_data))
