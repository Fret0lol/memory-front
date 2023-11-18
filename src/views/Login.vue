<template>
	<div>
		<h2>Login</h2>
		<form @submit.prevent="login">
			<label for="email">Email:</label>
			<input type="email" id="email" v-model="email" required />

			<label for="password">Password:</label>
			<input type="password" id="password" v-model="password" required />

			<button type="submit">Login</button>

			<p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
		</form>
	</div>
</template>

<script lang="ts">
import {ref} from "vue";
import { useAuthStore } from "../store/auth.store";
import router from "../router";

export default {
	setup() {
		const email = ref("");
		const password = ref("");
		const errorMessage = ref("");
		const authStore = useAuthStore();

		const login = async () => {
			try {
				errorMessage.value = "";
				const loginSuccessful = await authStore.login(email.value, password.value);

				if (loginSuccessful) {
					router.push("/dashboard");
				} else {
					errorMessage.value = "La connexion a échoué. Veuillez vérifier vos identifiants.";
				}
			} catch (error) {
				errorMessage.value = "Une erreur s'est produite lors de la connexion.";
			}
		};

		return {
			email,
			password,
			errorMessage,
			login,
		};
	},
};
</script>
../store/auth.store